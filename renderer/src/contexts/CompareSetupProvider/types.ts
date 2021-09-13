import { Dispatch, ReactNode, SetStateAction } from 'react'

export type CompareSetupContextData = {
  setSelectedPrevItem: Dispatch<SetStateAction<SelectProps>>
  setSelectedNextItem: Dispatch<SetStateAction<SelectProps>>
  setSelectedMachine: Dispatch<SetStateAction<SelectProps>>
  selectedMachine: SelectProps
  selectedPrevItem: SelectProps
  selectedNextItem: SelectProps
  prevItemInfo: ItemsTestData
  nextItemInfo: ItemsTestData
  toolsEquals: ToolingInfo[]
  toolsOnlyInPrev: ToolingInfo[]
  toolsOnlyInNext: ToolingInfo[]
  tempItems: SelectProps[]
  createInfoFiles: () => void
}

export type CompareSetupProviderProps = {
  children: ReactNode
}

export type ItemsTestData = {
  id: string
  label: string
  machine: string
  setupInfo: SetupInfo
  toolingInfo: ToolingInfo[]
}

export type SetupInfo = {
  id: string
  label: string
}

export type ToolingInfo = ToolingInfoData & {
  id: string
  label: string
  position: string
  toolID: string
}

export type ToolingInfoData = {
  toolData?: {
    id: string
    label: string
    location: string
    cost: number
  }
}

export type SelectProps = {
  id: string
  label: string
}
