import { HStack, FormControl, FormLabel, Flex, Text, Heading } from '@chakra-ui/react'

import { useCompareSetup, useStaticData } from '../../contexts'
import { Select } from '../Select'

export const CompareFormHeader = () => {
  const { machines } = useStaticData()

  const {
    selectedPrevItem,
    setSelectedPrevItem,
    selectedNextItem,
    setSelectedNextItem,
    selectedMachine,
    setSelectedMachine,
    tempItems,
    nextItemInfo,
  } = useCompareSetup()

  return (
    <Flex
      w="100%"
      align="center"
      bg="gray.700"
      direction="column"
      p="2"
      px="3"
      rounded="6"
      boxShadow="dark-lg"
    >
      <HStack spacing="6" w="100%" mb="1">
        <FormControl id="tool" w="48%" mr="auto">
          <FormLabel color="gray.200" my="-0.5" fontSize="small">
            Máquina
          </FormLabel>
          <Select
            options={machines}
            placeholder="Digite ou selecione a máquina..."
            closeMenuOnSelect
            value={selectedMachine}
            onChange={setSelectedMachine}
            noOptionsMessage={() => <Text>Item não encontrado</Text>}
          />
        </FormControl>
        <Flex w="48%">
          {nextItemInfo?.setupInfo?.label && (
            <Heading w="100%" textAlign="center" fontSize={20} fontWeight={700}>
              {nextItemInfo?.setupInfo?.label}
            </Heading>
          )}
        </Flex>
      </HStack>
      <HStack spacing="8" w="100%" mb="1">
        <FormControl id="tool" w="100%">
          <FormLabel color="gray.200" my="-0.5" fontSize="small">
            Item em máquina
          </FormLabel>
          <Select
            options={tempItems}
            placeholder="Digite ou selecione o item que está rodando..."
            closeMenuOnSelect
            value={selectedPrevItem}
            onChange={setSelectedPrevItem}
            noOptionsMessage={() => <Text>Item não encontrado</Text>}
          />
        </FormControl>
        <FormControl id="tool" w="100%">
          <FormLabel color="gray.200" my="-0.5" fontSize="small">
            Próximo setup
          </FormLabel>
          <Select
            options={tempItems}
            placeholder="Digite ou selecione o item que será ajustado..."
            closeMenuOnSelect
            value={selectedNextItem}
            onChange={setSelectedNextItem}
            noOptionsMessage={() => <Text>Item não encontrado</Text>}
          />
        </FormControl>
      </HStack>
    </Flex>
  )
}
