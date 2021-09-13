import { HStack, FormControl, FormLabel, Flex, Text } from '@chakra-ui/react'

import { useCreateSetup, useStaticData } from '../../contexts'
import { CreatableSelect } from '../CreatableSelect'

export const CreateSetupFormHeader = () => {
  const { machines } = useStaticData()

  const { selectedMachine, setSelectedMachine, selectedItem, setSelectedItem, items } =
    useCreateSetup()

  return (
    <Flex
      w="100%"
      align="center"
      bg="gray.700"
      direction="column"
      px="3"
      py="1"
      rounded="6"
      boxShadow="dark-lg"
      mb="auto"
    >
      <HStack spacing="4" w="100%" mb="2">
        <FormControl id="tool" w="100%">
          <FormLabel color="gray.200" my="-0.5" fontSize="small">
            Máquina
          </FormLabel>
          <CreatableSelect
            options={machines}
            placeholder="Selecione ou cadastre uma máquina..."
            closeMenuOnSelect
            value={selectedMachine}
            onChange={setSelectedMachine}
            createOptionPosition="last"
            formatCreateLabel={(input: string) => <Text>Cadastrar nova máquina... {input}</Text>}
          />
        </FormControl>
        <FormControl id="tool" w="100%">
          <FormLabel color="gray.200" my="-0.5" fontSize="small">
            Item
          </FormLabel>
          <CreatableSelect
            options={items}
            placeholder="Selecione ou cadastre um item para editar..."
            closeMenuOnSelect
            value={selectedItem}
            onChange={setSelectedItem}
            noOptionsMessage={() => <Text>Item não encontrado</Text>}
            createOptionPosition="last"
            formatCreateLabel={(input: string) => <Text>Criar novo item {input}</Text>}
          />
        </FormControl>
      </HStack>
    </Flex>
  )
}
