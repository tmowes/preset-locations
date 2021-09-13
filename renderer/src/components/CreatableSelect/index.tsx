import React, { cloneElement } from 'react'

import CreatableReactSelect from 'react-select/creatable'
import {
  Flex,
  Center,
  Box,
  StylesProvider,
  useMultiStyleConfig,
  useStyles,
  createIcon,
} from '@chakra-ui/react'

const ChevronDown = createIcon({
  displayName: 'ChevronDownIcon',
  d: 'M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z',
})

const chakraComponents = {
  Control: ({ children, innerRef, innerProps, isDisabled, isFocused, selectProps: { size } }) => {
    const inputStyles = useMultiStyleConfig('Input', { size })

    const heights = {
      sm: 8,
      md: 8,
      lg: 12,
    }

    return (
      <StylesProvider value={inputStyles}>
        <Flex
          ref={innerRef}
          sx={{
            ...inputStyles.field,
            p: 0,
            overflow: 'hidden',
            h: 'auto',
            minH: heights[size],
            borderColor: 'transparent',
            rounded: 6,
            _focus: { borderColor: 'orange.500' },
            _hover: { bg: 'gray.500' },
            bg: 'gray.600',
          }}
          {...innerProps}
          {...(isFocused && { 'data-focus': true })}
          {...(isDisabled && { disabled: true })}
        >
          {children}
        </Flex>
      </StylesProvider>
    )
  },

  DropdownIndicator: ({ innerProps }) => (
    <Center
      {...innerProps}
      sx={{
        h: '100%',
        borderRadius: 0,
        borderWidth: 0,
        bg: 'transparent',
        cursor: 'pointer',
      }}
    >
      <ChevronDown h={7} w={7} />
    </Center>
  ),

  MenuList: ({ innerRef, children, maxHeight }) => {
    const { list } = useStyles()
    return (
      <Box
        sx={{
          ...list,
          maxH: `${maxHeight}px`,
          overflowY: 'auto',
          bg: 'gray.600',
          borderColor: 'gray.500',
          borderRadius: 6,
        }}
        ref={innerRef}
      >
        {children}
      </Box>
    )
  },

  Option: ({ innerRef, innerProps, children, isFocused, isDisabled, selectProps: { size } }) => {
    const { item } = useStyles()
    return (
      <Box
        role="button"
        _focus={{ bg: 'red' }}
        _selected={{ bg: 'red' }}
        sx={{
          ...item,
          w: '100%',
          color: 'gray.200',
          textAlign: 'left',
          fontSize: size,
          bg: isFocused ? 'gray.500' : 'transparent',
          _hover: { bg: 'gray.500' },
          px: 2,
          py: 1,
        }}
        ref={innerRef}
        {...innerProps}
        {...(isDisabled && { disabled: true })}
      >
        {children}
      </Box>
    )
  },
}

const ChakraReactSelect = ({
  children,
  styles = {},
  theme = () => ({}),
  size = 'sm',
  ...props
}) =>
  cloneElement(children, {
    components: {
      ...chakraComponents,
    },
    styles,
    theme: baseTheme => ({
      colors: {},
      spacing: {
        ...baseTheme.spacing,
      },
    }),
    size,
    ...props,
  })

export const CreatableSelect = props => (
  <ChakraReactSelect {...props}>
    <CreatableReactSelect />
  </ChakraReactSelect>
)
