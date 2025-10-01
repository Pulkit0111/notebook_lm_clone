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
        bg: props.colorMode === 'dark' ? '#1F1F1F' : '#FFFFFF',
        color: props.colorMode === 'dark' ? '#E8EAED' : '#202124',
      },
    }),
  },
  colors: {
    // Google Blue - Primary Brand Color
    brand: {
      50: '#E8F0FE',
      100: '#D2E3FC',
      200: '#AECBFA',
      300: '#8AB4F8',
      400: '#669DF6',
      500: '#1A73E8',  // Primary Google Blue
      600: '#1967D2',
      700: '#185ABC',
      800: '#174EA6',
      900: '#0D47A1',
    },
    // Neutral Grays - Material Design
    neutral: {
      50: '#F8F9FA',
      100: '#F1F3F4',
      200: '#E8EAED',
      300: '#DADCE0',
      400: '#BDC1C6',
      500: '#9AA0A6',
      600: '#80868B',
      700: '#5F6368',
      800: '#3C4043',
      900: '#202124',
    },
    // Dark mode specific colors
    darkBg: {
      primary: '#1F1F1F',
      secondary: '#292929',
      tertiary: '#333333',
      hover: '#323639',
    },
  },
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
  },
  fontSizes: {
    '2xs': '0.6875rem',  // 11px
    'xs': '0.75rem',      // 12px
    'sm': '0.875rem',     // 14px
    'md': '1rem',         // 16px
    'lg': '1.25rem',      // 20px
    'xl': '1.5rem',       // 24px
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.08)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  radii: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'md',
        transition: 'all 0.15s ease-out',
      },
      variants: {
        solid: (props: any) => ({
          bg: props.colorMode === 'dark' ? 'brand.300' : 'brand.500',
          color: 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'brand.400' : 'brand.600',
            _disabled: {
              bg: props.colorMode === 'dark' ? 'brand.300' : 'brand.500',
            },
          },
          _active: {
            bg: props.colorMode === 'dark' ? 'brand.500' : 'brand.700',
          },
        }),
        ghost: (props: any) => ({
          color: props.colorMode === 'dark' ? 'neutral.200' : 'neutral.700',
          _hover: {
            bg: props.colorMode === 'dark' ? 'darkBg.hover' : 'neutral.100',
          },
        }),
      },
      sizes: {
        xs: {
          fontSize: 'xs',
          h: '32px',
          px: 3,
        },
        sm: {
          fontSize: 'sm',
          h: '36px',
          px: 3,
        },
        md: {
          fontSize: 'sm',
          h: '40px',
          px: 4,
        },
        lg: {
          fontSize: 'md',
          h: '48px',
          px: 5,
        },
      },
    },
    Card: {
      baseStyle: (props: any) => ({
        container: {
          bg: props.colorMode === 'dark' ? 'darkBg.secondary' : 'white',
          boxShadow: 'none',
          borderRadius: 'md',
        },
      }),
    },
    Input: {
      variants: {
        outline: (props: any) => ({
          field: {
            borderWidth: '1px',
            borderColor: props.colorMode === 'dark' ? 'neutral.700' : 'neutral.300',
            bg: props.colorMode === 'dark' ? 'darkBg.tertiary' : 'white',
            _hover: {
              borderColor: props.colorMode === 'dark' ? 'neutral.600' : 'neutral.400',
            },
            _focus: {
              borderColor: props.colorMode === 'dark' ? 'brand.300' : 'brand.500',
              boxShadow: `0 0 0 1px ${props.colorMode === 'dark' ? '#8AB4F8' : '#1A73E8'}`,
            },
          },
        }),
      },
    },
    Textarea: {
      variants: {
        outline: (props: any) => ({
          borderWidth: '1px',
          borderColor: props.colorMode === 'dark' ? 'neutral.700' : 'neutral.300',
          bg: props.colorMode === 'dark' ? 'darkBg.tertiary' : 'white',
          _hover: {
            borderColor: props.colorMode === 'dark' ? 'neutral.600' : 'neutral.400',
          },
          _focus: {
            borderColor: props.colorMode === 'dark' ? 'brand.300' : 'brand.500',
            boxShadow: `0 0 0 1px ${props.colorMode === 'dark' ? '#8AB4F8' : '#1A73E8'}`,
          },
        }),
      },
    },
  },
});

export default theme;

