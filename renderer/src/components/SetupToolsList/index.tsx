import { Flex, Heading, VStack } from '@chakra-ui/react'

import { SetupToolCardItem } from '../SetupToolCardItem'
import { SetupToolsListProps } from './types'

export const SetupToolsList = (props: SetupToolsListProps) => {
  const { show, title, tools } = props

  if (!show) {
    return <></>
  }

  return (
    <Flex
      w="100%"
      align="center"
      bg="gray.700"
      px="3"
      pt="1"
      boxShadow="dark-lg"
      rounded="6"
      mb="3"
      draggable
    >
      <VStack w="100%" h="100%" spacing="1">
        <Heading fontSize={15} fontWeight={700} mr="auto">
          {title}
        </Heading>
        {tools.map((tool, i) => (
          <SetupToolCardItem key={tool.id + i} index={i} tool={tool} />
        ))}
      </VStack>
    </Flex>
  )
}
