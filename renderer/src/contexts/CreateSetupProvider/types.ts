import { Dispatch, ReactNode, SetStateAction } from 'react'

export type CreateSetupContextData = {
  setSelectedMachine?: Dispatch<SetStateAction<SelectProps>>
  setSelectedItem?: Dispatch<SetStateAction<SelectProps>>
  selectedItem?: SelectProps
  selectedMachine?: SelectProps
  // prevItemInfo?: ItemsTestData
  // nextItemInfo?: ItemsTestData
  itemToolingInfo?: ToolingInfo[]
  setProgNumber: Dispatch<SetStateAction<string>>
  progNumber: string
  items?: SelectProps[]
  createInfoFiles?: () => void
  testAction?: () => void

  addNewToolToList: () => void
  removeToolFromList: (id: string) => void

  newToolPosition: number
  setNewToolPosition: Dispatch<SetStateAction<number>>

  selectedNewTool: SelectProps
  setSelectedNewTool: Dispatch<SetStateAction<SelectProps>>

  toolOperationDescription: string
  setToolOperationDescription: Dispatch<SetStateAction<string>>
}

export type CreateSetupProviderProps = {
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
