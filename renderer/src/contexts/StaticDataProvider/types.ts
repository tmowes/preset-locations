import { ReactNode } from 'react'

export type StaticDataContextData = {
  isLoading: boolean
  tools: SelectProps[]
  items: SelectProps[]
  machines: SelectProps[]
  loadMachinesFromLocalFolders: () => void
}

export type StaticDataProviderProps = {
  children: ReactNode
}

export type SelectProps = {
  id: string
  label: string
}
