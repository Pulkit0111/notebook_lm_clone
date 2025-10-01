import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
        color: props.colorMode === 'dark' ? 'gray.100' : 'gray.800',
      },
    }),
  },
  colors: {
    brand: {
      50: '#e6f2ff',
      100: '#bfdeff',
      200: '#99caff',
      300: '#73b6ff',
      400: '#4da2ff',
      500: '#268eff',
      600: '#1e71cc',
      700: '#165599',
      800: '#0e3866',
      900: '#071c33',
    },
  },
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
      variants: {
        solid: (props: any) => ({
          bg: props.colorMode === 'dark' ? 'brand.500' : 'brand.500',
          color: 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'brand.600' : 'brand.600',
          },
        }),
      },
    },
    Card: {
      baseStyle: (props: any) => ({
        container: {
          bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
          boxShadow: props.colorMode === 'dark' ? 'dark-lg' : 'sm',
        },
      }),
    },
  },
});

export default theme;

