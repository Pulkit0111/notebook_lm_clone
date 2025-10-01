import logging
from typing import Dict, Any, Optional
import json

from langchain_openai import ChatOpenAI
from tavily import TavilyClient
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

from app.core.config import settings

logger = logging.getLogger(__name__)


class RAGService:
    """Service for RAG query processing."""
    
    def __init__(self):
        self.llm = ChatOpenAI(
            model="gpt-3.5-turbo",
            temperature=0,
            openai_api_key=settings.OPENAI_API_KEY
        )
        self.tavily_client = TavilyClient(api_key=settings.TAVILY_API_KEY)
        self._setup_prompts()
        logger.info("RAGService initialized")
    
    def _setup_prompts(self):
        """Setup prompt templates."""
        self.answer_determination_prompt = ChatPromptTemplate.from_template("""
You are an AI assistant tasked with determining if the provided context from a PDF contains sufficient information to answer a user's question.

Context from PDF: {context}

User Question: {question}

First, carefully analyze if the context provides adequate information to answer the question.

If the context contains sufficient information to answer the question, respond with a complete and accurate answer based ONLY on the provided context.

If the context does NOT contain sufficient information to fully answer the question, respond with exactly: "[NEED_WEB_SEARCH]"

Your response:
""")
        
        self.web_search_prompt = ChatPromptTemplate.from_template("""
You are an AI assistant helping a user with their question.

User Question: {question}

Web Search Results: {web_results}

Using the web search results, provide a comprehensive and accurate answer to the user's question.
Make sure to cite sources from the search results where appropriate.
""")
    
    def format_docs(self, docs) -> str:
        """Format retrieved documents into a single string."""
        return "\n\n".join(doc.page_content for doc in docs)
    
    def query_pdf(self, vector_store, question: str) -> Dict[str, Any]:
        """
        Query the PDF using RAG with web search fallback.
        
        Returns:
            Dict containing answer, source, and metadata
        """
        try:
            # Create retriever
            retriever = vector_store.as_retriever(
                search_kwargs={"k": settings.TOP_K_CHUNKS}
            )
            
            # Build determination chain
            determination_chain = (
                {
                    "context": retriever | self.format_docs,
                    "question": RunnablePassthrough(),
                }
                | self.answer_determination_prompt
                | self.llm
                | StrOutputParser()
            )
            
            # Try to answer from PDF
            logger.info(f"Processing query: {question[:100]}...")
            pdf_response = determination_chain.invoke(question)
            
            # Check if web search is needed
            if "[NEED_WEB_SEARCH]" in pdf_response:
                logger.info("PDF context insufficient, falling back to web search")
                return self._web_search_fallback(question)
            else:
                logger.info("Answer generated from PDF successfully")
                return {
                    "answer": pdf_response,
                    "source": "pdf",
                    "chunks_used": settings.TOP_K_CHUNKS,
                    "web_sources": None
                }
        
        except Exception as e:
            logger.error(f"Error querying PDF: {e}")
            raise
    
    def _web_search_fallback(self, question: str) -> Dict[str, Any]:
        """Perform web search and generate answer."""
        try:
            # Perform web search
            logger.info("Performing web search...")
            response = self.tavily_client.search(query=question, max_results=3)
            search_results = response.get('results', [])
            
            # Format search results as text
            search_text = "\n\n".join([
                f"Title: {r.get('title', '')}\nContent: {r.get('content', '')}\nURL: {r.get('url', '')}"
                for r in search_results
            ])
            
            # Build web search chain
            web_search_chain = (
                {
                    "question": RunnablePassthrough(),
                    "web_results": lambda x: search_text
                }
                | self.web_search_prompt
                | self.llm
                | StrOutputParser()
            )
            
            # Generate answer from web results
            answer = web_search_chain.invoke(question)
            
            # Parse web sources
            web_sources = self._parse_web_sources(search_results)
            
            logger.info("Answer generated from web search successfully")
            return {
                "answer": answer,
                "source": "web",
                "chunks_used": None,
                "web_sources": web_sources
            }
        
        except Exception as e:
            logger.error(f"Error in web search fallback: {e}")
            raise
    
    def _parse_web_sources(self, search_results) -> list:
        """Parse web search results into structured format."""
        sources = []
        
        # Extract source information from Tavily results
        if isinstance(search_results, list):
            for result in search_results:
                if isinstance(result, dict):
                    sources.append({
                        "title": result.get("title", "Unknown"),
                        "url": result.get("url", ""),
                        "snippet": result.get("content", result.get("snippet", ""))
                    })
        
        return sources


# Global RAG service instance
rag_service = RAGService()

