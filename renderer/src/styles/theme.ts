import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {},
  fonts: {
    heading: 'Roboto, sans-serif',
    body: 'Roboto, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'transparent',
        color: 'gray.100',
        '.apexcharts-menu': {
          background: 'gray.800',
          border: 0,
        },
        '.apexcharts-theme-light .apexcharts-menu-item:hover': {
          background: 'gray.700',
        },
      },
      '*::placeholder': {
        color: 'gray.100',
      },
      '&::-webkit-scrollbar': {
        width: '6px',
      },
      '&::-webkit-scrollbar-track': {
        width: '6px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'gray.500',
        borderRadius: '3px',
      },
    },
  },
})
