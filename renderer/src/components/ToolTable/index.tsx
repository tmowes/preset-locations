import { RiDeleteBin2Line } from 'react-icons/ri'
import { Flex, Icon, Table, Tbody, Td, Th, Thead, Text, Tr, IconButton } from '@chakra-ui/react'

import { useCreateSetup } from '../../contexts'
import { webKitScrollBar } from '../../utils/webKitScrollBar'

export const ToolTable = () => {
  const { selectedItem, itemToolingInfo, removeToolFromList } = useCreateSetup()

  if (!selectedItem) {
    return <></>
  }

  return (
    <Flex
      w="100%"
      bg="gray.700"
      rounded="6"
      pt="1"
      overflowY="scroll"
      boxShadow="dark-lg"
      css={webKitScrollBar}
    >
      <Table colorScheme="whiteAlpha" variant="striped" size="sm">
        <Thead>
          <Tr>
            <Th p="1" w="10%">
              <Text textAlign="center" color="gray.400" fontWeight="bold">
                Posição
              </Text>
            </Th>
            <Th p="1" w="50%">
              <Text textAlign="center" color="gray.400" fontWeight="bold">
                Ferramenta
              </Text>
            </Th>
            <Th p="1" w="50%">
              <Text color="gray.400" fontWeight="bold">
                Descrição operação
              </Text>
            </Th>
            <Th p="1" w="8%">
              <Text color="gray.400" fontWeight="bold">
                Remover
              </Text>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {itemToolingInfo.map(({ toolData, position, label, id }, i) => (
            <Tr key={id + i}>
              <Td p="1">
                <Text textAlign="center" color="gray.200" fontWeight="normal">
                  {`T${position.replace('T', '').toString().padStart(2, '0')}`}
                </Text>
              </Td>
              <Td p="1">
                <Text color="gray.200" fontWeight="bold">
                  {toolData?.label}
                </Text>
              </Td>
              <Td p="1">
                <Text color="gray.200" fontWeight="normal">
                  {label}
                </Text>
              </Td>
              <Td p="1">
                <Flex justify="center">
                  <IconButton
                    aria-label="Remover item"
                    rounded="6"
                    cursor="pointer"
                    as="a"
                    h="7"
                    alignSelf="center"
                    colorScheme="whiteAlpha"
                    onClick={() => removeToolFromList(id)}
                    icon={<Icon as={RiDeleteBin2Line} fontSize="18" />}
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  )
}
