import { Box, Flex, Text, Image } from '@chakra-ui/react'

import { WindowContainerProps } from './types'

export const WindowContainer = (props: WindowContainerProps) => {
  const { children } = props
  return (
    <Box
      w="100vw"
      h="100vh"
      bg="transparent"
      borderRadius="8"
      overflow="hidden"
      __css={{
        WebkitUserSelect: 'none',
        WebkitAppRegion: 'drag',
      }}
    >
      <Flex h="96vh" boxShadow="dark-lg">
        <Flex
          w="100%"
          align="center"
          justify="flex-end"
          pt="1"
          bg="transparent"
          mt="auto"
          __css={{
            WebkitAppRegion: 'no-drag',
          }}
        >
          {children}
        </Flex>
      </Flex>
      <Flex align="center" justify="space-between" h="4vh" boxShadow="dark-lg" />
    </Box>
  )
}
