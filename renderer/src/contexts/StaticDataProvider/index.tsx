import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import fs from 'fs'

import { tools as toolsData } from '../../data/tools'
import { SelectProps, StaticDataContextData, StaticDataProviderProps } from './types'
import { itemsTestData } from '../../data/itemsTest'
import { convertToSlug } from '../../utils/convertToSlug'

export const StaticDataContext = createContext({} as StaticDataContextData)

export const StaticDataProvider = (props: StaticDataProviderProps) => {
  const { children } = props
  const [isLoading, setIsLoading] = useState(true)
  const [machines, setMachines] = useState<SelectProps[]>([])
  const [tools, setTools] = useState<SelectProps[]>([])
  const [items, setItems] = useState<SelectProps[]>([])

  const loadStaticData = useCallback(() => {
    setTools(toolsData.map(({ id, label }) => ({ id, label })))
    setItems(itemsTestData.map(({ id, label }) => ({ id, label })))
  }, [])

  const loadMachinesFromLocalFolders = useCallback(() => {
    fs.readdir('./setupConfig', (_, folders) => {
      if (folders.length > 0) {
        setMachines(
          folders.map(folder => ({
            id: convertToSlug(folder),
            label: folder.toLocaleUpperCase().replaceAll('-', ' '),
          }))
        )
      }
    })
  }, [])

  useEffect(() => {
    loadStaticData()
    loadMachinesFromLocalFolders()
    setIsLoading(false)
  }, [loadMachinesFromLocalFolders, loadStaticData])

  const providerValues = {
    isLoading,
    tools,
    items,
    machines,
    loadMachinesFromLocalFolders,
  }

  return (
    <StaticDataContext.Provider value={providerValues}>{children}</StaticDataContext.Provider>
  )
}

export function useStaticData(): StaticDataContextData {
  const context = useContext(StaticDataContext)
  if (!context) {
    throw new Error('useStaticData must be used within a StaticDataProvider')
  }
  return context
}
