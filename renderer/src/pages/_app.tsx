import type { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'

import * as C from '../components'
import { AppProvider } from '../contexts'
import { theme } from '../styles/theme'

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props
  return (
    <ChakraProvider theme={theme}>
      <AppProvider>
        <C.WindowContainer>
          <Component {...pageProps} />
        </C.WindowContainer>
      </AppProvider>
    </ChakraProvider>
  )
}
