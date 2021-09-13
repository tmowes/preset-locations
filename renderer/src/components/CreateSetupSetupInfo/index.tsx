import { FormControl, FormLabel, Flex, Input } from '@chakra-ui/react'

import { useCreateSetup } from '../../contexts'

export const CreateSetupSetupInfo = () => {
  const { progNumber, setProgNumber, selectedItem } = useCreateSetup()

  if (!selectedItem) {
    return <></>
  }

  return (
    <Flex
      w="100%"
      align="center"
      bg="gray.700"
      direction="column"
      px="3"
      py="2"
      rounded="6"
      boxShadow="dark-lg"
    >
      <FormControl id="prog_number">
        <FormLabel color="gray.200" my="-0.5" fontSize="small">
          Nº do programa e variante
        </FormLabel>
        <Input
          px="2"
          bg="gray.600"
          h={9}
          fontSize={14}
          placeholder="Digite o numero e variante do programa"
          value={progNumber}
          onChange={e => setProgNumber(e.target.value)}
          color="gray.100"
          _focus={{ borderColor: 'orange.500' }}
          _hover={{
            borderColor: 'transparent',
            bg: 'gray.500',
          }}
          borderColor="transparent"
        />
      </FormControl>
    </Flex>
  )
}
