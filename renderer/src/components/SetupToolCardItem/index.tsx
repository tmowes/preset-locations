import { useState } from 'react'

import { Flex, HStack, IconButton, Text } from '@chakra-ui/react'
import { FiPlus, FiCheck } from 'react-icons/fi'

import { formatCurrency } from '../../utils/formatCurrency'
import { SetupToolCardItemProps } from './types'

export const SetupToolCardItem = (props: SetupToolCardItemProps) => {
  const { tool } = props

  const [active, setActive] = useState(false)

  return (
    <Flex w="100%" align="center" pt="1" borderBottomWidth={1} borderBottomColor="gray.600">
      <HStack spacing="3" w="100%" justifyContent="space-between">
        <Text w="10%" textAlign="center" fontSize={14} fontWeight="bold">
          {tool.position === '' ? 'T00' : tool.position}
        </Text>
        <Text
          w="100%"
          textDecoration={active ? 'line-through' : 'none'}
          textDecorationColor="green"
          textDecorationThickness="25%"
          fontSize={14}
          fontWeight="normal"
        >
          {tool.toolData?.label}
        </Text>
        <Text w="35%" fontSize={14} fontWeight="normal">
          {tool.label}
        </Text>
        <Text
          w="20%"
          textDecoration={active ? 'line-through' : 'none'}
          textDecorationColor="green"
          textDecorationThickness="25%"
          fontSize={14}
          fontWeight="normal"
        >
          {tool.toolData?.location}
        </Text>
        <Text
          w="15%"
          textDecoration={active ? 'line-through' : 'none'}
          textDecorationColor="green"
          textDecorationThickness="25%"
          fontSize={14}
          fontWeight="normal"
        >
          {formatCurrency(tool.toolData?.cost)}
        </Text>
        <IconButton
          aria-label="adicionar item a lista"
          title="adicionar item a lista"
          colorScheme="blackAlpha"
          w="6"
          h="6"
          rounded="6"
          fontSize={18}
          icon={active ? <FiCheck color="green" /> : <FiPlus />}
          onClick={() => setActive(prev => !prev)}
          _focus={{
            borderColor: 'gray',
            borderWidth: '1px',
          }}
        />
      </HStack>
    </Flex>
  )
}
