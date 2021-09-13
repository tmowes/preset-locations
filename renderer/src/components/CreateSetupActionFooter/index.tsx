import Link from 'next/link'

import { Flex, HStack, IconButton, Icon, Heading } from '@chakra-ui/react'
import { AiOutlineLeft } from 'react-icons/ai'

export const CreateSetupActionFooter = () => (
  <Flex w="100%" h="16" align="flex-start" mb="auto" rounded="6">
    <HStack HStack w="100%">
      <Link href="/home">
        <IconButton
          mr="auto"
          aria-label="Voltar"
          bg="gray.700"
          color="gray.100"
          p="2"
          py="4"
          rounded="6"
          fontSize="32"
          outline="none"
          alignItems="center"
          justifyContent="center"
          boxShadow="dark-lg"
          _hover={{ bg: 'gray.600' }}
          icon={<Icon as={AiOutlineLeft} />}
        />
      </Link>
      <Heading fontSize={16} fontWeight={600}>
        Formulário de cadastro de setup
      </Heading>
      <Flex />
      {/* <IconButton
          ml="auto"
          aria-label="Salvar"
          bg="orange.500"
          color="gray.100"
          p="2"
          py="4"
          rounded="6"
          fontSize="32"
          outline="none"
          alignItems="center"
          justifyContent="center"
          boxShadow="dark-lg"
          _hover={{ bg: 'orange.400' }}
          onClick={testAction}
          icon={<Icon as={AiOutlineCheck} />}
        /> */}
    </HStack>
  </Flex>
)
