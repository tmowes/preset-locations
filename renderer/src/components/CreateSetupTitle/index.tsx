import Link from 'next/link'

import { Flex, HStack, IconButton, Icon, Heading } from '@chakra-ui/react'
import { AiOutlineLeft } from 'react-icons/ai'

export const CreateSetupTitle = () => (
  <Flex w="100%" h="6" mb="0" rounded="6">
    <HStack HStack w="100%">
      <Link href="/home">
        <IconButton
          position="absolute"
          w="8"
          h="8"
          aria-label="Voltar"
          bg="transparent"
          color="gray.100"
          rounded="6"
          fontSize="18"
          outline="none"
          alignItems="center"
          justifyContent="center"
          _hover={{ bg: 'gray.600' }}
          icon={<Icon as={AiOutlineLeft} />}
        />
      </Link>
      <Heading w="100%" textAlign="center" fontSize={16} fontWeight={600}>
        Formulário de cadastro de setup
      </Heading>
    </HStack>
  </Flex>
)
