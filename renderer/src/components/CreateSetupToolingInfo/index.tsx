import {
  FormControl,
  FormLabel,
  Flex,
  Input,
  HStack,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
  Text,
  IconButton,
} from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'

import { useCreateSetup, useStaticData } from '../../contexts'
import { Select } from '../Select'

export const CreateSetupToolingInfo = () => {
  const { tools } = useStaticData()
  const {
    selectedItem,
    addNewToolToList,

    newToolPosition,
    setNewToolPosition,

    selectedNewTool,
    setSelectedNewTool,

    toolOperationDescription,
    setToolOperationDescription,
  } = useCreateSetup()

  if (!selectedItem) {
    return <></>
  }

  return (
    <Flex w="100%" align="center" bg="gray.700" px="3" py="2" rounded="6" boxShadow="dark-lg">
      <HStack spacing="3" w="100%">
        <FormControl w="15%" id="amount">
          <FormLabel color="gray.200" my="-0.5" fontSize="small">
            Posição
          </FormLabel>
          <NumberInput
            defaultValue={1}
            min={1}
            max={40}
            keepWithinRange
            clampValueOnBlur
            allowMouseWheel
            size="sm"
            value={newToolPosition}
            onChange={e => setNewToolPosition(Number(e))}
            focusBorderColor="orange.500"
            borderColor="transparent"
            color="gray.100"
            _hover={{
              borderColor: 'transparent',
            }}
          >
            <NumberInputStepper borderColor="transparent">
              <NumberIncrementStepper borderColor="transparent" color="gray.100" />
              <NumberDecrementStepper borderColor="transparent" color="gray.100" />
            </NumberInputStepper>
            <NumberInputField
              fontWeight="bold"
              rounded="6"
              _hover={{
                borderColor: 'transparent',
              }}
            />
          </NumberInput>
        </FormControl>
        <FormControl id="tool" w="100%">
          <FormLabel color="gray.200" my="-0.5" fontSize="small">
            Ferramenta
          </FormLabel>
          <Select
            options={tools}
            placeholder="Digite ou selecione uma ferramenta..."
            closeMenuOnSelect
            value={selectedNewTool}
            onChange={setSelectedNewTool}
            noOptionsMessage={() => <Text>Ferramenta não encontrada</Text>}
          />
        </FormControl>
        <FormControl id="prog_number" w="70%">
          <FormLabel color="gray.200" my="-0.5" fontSize="small">
            Descrição operação
          </FormLabel>
          <Input
            px="2"
            bg="gray.600"
            h={9}
            fontSize={14}
            placeholder="Descreva a operação da ferramenta..."
            value={toolOperationDescription}
            onChange={e => setToolOperationDescription(e.target.value)}
            color="gray.100"
            _focus={{ borderColor: 'orange.500' }}
            _hover={{
              borderColor: 'transparent',
              bg: 'gray.500',
            }}
            borderColor="transparent"
          />
        </FormControl>
        <FormControl w="5%" id="add">
          <FormLabel color="gray.700" my="-0.5" fontSize="small">
            _
          </FormLabel>
          <IconButton
            aria-label="adicionar item a lista"
            title="adicionar item a lista"
            colorScheme="orange"
            size="sm"
            rounded="6"
            fontSize={24}
            icon={<FiPlus name="plus" />}
            onClick={addNewToolToList}
            focusBorderColor="orange.500"
          />
        </FormControl>
      </HStack>
    </Flex>
  )
}
