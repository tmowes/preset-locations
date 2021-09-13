import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import fs from 'fs'
import { useToast } from '@chakra-ui/react'

import { CreateSetupContextData, CreateSetupProviderProps, ToolingInfo } from './types'
import { SelectProps } from '../StaticDataProvider/types'
import { tools } from '../../data/tools'
import { parseFileToBaseInfo } from '../../utils/parseFileToBaseInfo'
import { parseFileToSetupInfo } from '../../utils/parseFileToSetupInfo'
import { parseFileToToolingInfo } from '../../utils/parseFileToToolingInfo'
import { convertToSlug } from '../../utils/convertToSlug'
import { createItemDirAndInnerFiles, fileOptions } from '../../utils/createItemDirAndInnerFiles'
import { formatToolPosition } from '../../utils/formatToolPosition'
import { convertToLabel } from '../../utils/convertToLabel'

export const CreateSetupContext = createContext({} as CreateSetupContextData)

export const CreateSetupProvider = (props: CreateSetupProviderProps) => {
  const { children } = props
  const toast = useToast()
  const [selectedMachine, setSelectedMachine] = useState<SelectProps | null>(null)
  const [selectedItem, setSelectedItem] = useState<SelectProps | null>(null)
  const [items, setItems] = useState<SelectProps[]>([])
  const [itemBaseInfo, setItemBaseInfo] = useState({} as SelectProps)
  const [itemSetupInfo, setItemSetupInfo] = useState({} as SelectProps)
  const [itemToolingInfo, setItemToolingInfo] = useState<ToolingInfo[]>([])
  const [progNumber, setProgNumber] = useState('')
  const [newToolPosition, setNewToolPosition] = useState(1)
  const [toolOperationDescription, setToolOperationDescription] = useState('')
  const [selectedNewTool, setSelectedNewTool] = useState<SelectProps | null>(null)

  const addNewToolToList = useCallback(() => {
    const toolData = tools.find(tool => tool.id === selectedNewTool.id)
    const newTool = {
      id: convertToSlug(
        `${formatToolPosition(newToolPosition)}-${toolOperationDescription}-${selectedNewTool.id}`
      ),
      label: convertToLabel(`${formatToolPosition(newToolPosition)} ${toolOperationDescription}`),
      position: formatToolPosition(newToolPosition),
      toolID: selectedNewTool.id,
      toolData: {
        id: toolData.id,
        label: toolData.label,
        location: toolData.location,
        cost: toolData.cost,
      },
    }
    setItemToolingInfo(prev => [...prev, newTool])
    setSelectedNewTool(null)
    setNewToolPosition(1)
    setToolOperationDescription('')
  }, [newToolPosition, selectedNewTool, toolOperationDescription])

  const removeToolFromList = useCallback((id: string) => {
    setItemToolingInfo(prev => prev.filter(tool => tool.id !== id))
  }, [])

  useEffect(() => {
    if (selectedMachine !== null) {
      setSelectedItem(null)
      const checkMachineDir = fs.existsSync(
        `./setupConfig/${convertToSlug(selectedMachine.label)}`
      )
      if (!checkMachineDir) {
        fs.mkdirSync(`./setupConfig/${convertToSlug(selectedMachine.label)}`, {
          recursive: true,
        })
        setItems([])
      } else {
        fs.readdir(`./setupConfig/${convertToSlug(selectedMachine.label)}`, (_, folders) => {
          if (folders.length > 0) {
            setItems(
              folders.map(folder => ({
                id: folder,
                label: folder.toLocaleUpperCase().replaceAll('-', ' '),
              }))
            )
          } else {
            setItems([])
          }
        })
      }
    }
  }, [selectedMachine])

  useEffect(() => {
    if (selectedMachine !== null && selectedItem !== null) {
      const machineSlug = convertToSlug(selectedMachine.label)
      const checkItemDir = fs.existsSync(`./setupConfig/${machineSlug}/${selectedItem.label}`)
      if (!checkItemDir) {
        const baseInfo = createItemDirAndInnerFiles(selectedMachine.label, selectedItem.label)
        setItemBaseInfo({ ...baseInfo })
      } else {
        const itemlabel = selectedItem.label
        const pathToBaseInfo = `./setupConfig/${machineSlug}/${itemlabel}/baseInfo.txt`
        const pathToSetupInfo = `./setupConfig/${machineSlug}/${itemlabel}/setupInfo.txt`
        const pathToToolingInfo = `./setupConfig/${machineSlug}/${itemlabel}/toolingInfo.txt`

        const streamBaseInfo = fs.createReadStream(pathToBaseInfo)
        streamBaseInfo.once('open', () => {
          setItemBaseInfo({} as SelectProps)
          streamBaseInfo.on('data', chunk => {
            const content = chunk.toString().split('\n')
            const baseInfo = parseFileToBaseInfo(content)
            setItemBaseInfo({ ...baseInfo })
          })
        })

        const streamSetupInfo = fs.createReadStream(pathToSetupInfo)
        streamSetupInfo.once('open', () => {
          setProgNumber('')
          setItemSetupInfo({} as SelectProps)
          streamSetupInfo.on('data', chunk => {
            const content = chunk.toString().split('\n')
            const setupInfo = parseFileToSetupInfo(content)
            setProgNumber(setupInfo.label.replace('PROGRAMA ', '').trim().toUpperCase())
            setItemSetupInfo(setupInfo)
          })
        })

        const streamToolingInfo = fs.createReadStream(pathToToolingInfo)
        streamToolingInfo.once('open', () => {
          setItemToolingInfo([])
          streamToolingInfo.on('data', chunk => {
            const content = chunk.toString().split('\n')
            const toolingInfos = parseFileToToolingInfo(content)
            const loadedToolingInfo = tools
              .map(tool =>
                toolingInfos
                  .sort()
                  .map(
                    item =>
                      item.toolID.includes(tool.id) && {
                        id: item.id,
                        label: item.label,
                        position: item.position,
                        toolID: item.toolID,
                        toolData: {
                          id: tool.id,
                          label: tool.label,
                          location: tool.location,
                          cost: tool.cost,
                        },
                      }
                  )
                  .filter(item => item)
              )
              .flat()
            setItemToolingInfo([...loadedToolingInfo])
          })
        })
      }
    }
  }, [selectedMachine, selectedItem])

  useEffect(() => {
    if (
      selectedMachine !== null &&
      selectedItem !== null &&
      progNumber !== '' &&
      itemToolingInfo.length > 0
    ) {
      const machineSlug = convertToSlug(selectedMachine.label)
      const itemlabel = selectedItem.label
      const newSetupInfo = {
        id: `prog-${convertToSlug(progNumber)}`,
        label: `PROGRAMA ${progNumber.toUpperCase()}`,
      }

      setItemSetupInfo(newSetupInfo)
      const createSetupInfo = fs.createWriteStream(
        `./setupConfig/${machineSlug}/${itemlabel}/setupInfo.txt`,
        fileOptions
      )
      createSetupInfo.once('open', () => {
        createSetupInfo.write(`${newSetupInfo.id}\r\n`)
        createSetupInfo.write(`${newSetupInfo.label}\r\n`)
        createSetupInfo.end()
      })

      const createToolingInfo = fs.createWriteStream(
        `./setupConfig/${machineSlug}/${itemlabel}/toolingInfo.txt`,
        fileOptions
      )

      createToolingInfo.once('open', () => {
        itemToolingInfo.forEach(tool => {
          createToolingInfo.write(`${tool.position}\r\n`)
          createToolingInfo.write(`${tool.label}\r\n`)
          createToolingInfo.write(`${tool.toolID}\r\n`)
        })
        createToolingInfo.end()
      })
      toast({
        title: 'Atualização salva.',
        description: 'Informações atualizadas com sucesso.',
        status: 'success',
        position: 'bottom-right',
        duration: 1500,
        isClosable: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemToolingInfo, progNumber])

  const providerValues = {
    setSelectedMachine,
    setSelectedItem,

    selectedMachine,
    selectedItem,

    progNumber,
    setProgNumber,

    itemBaseInfo,
    itemSetupInfo,
    itemToolingInfo,

    addNewToolToList,
    removeToolFromList,

    newToolPosition,
    setNewToolPosition,

    selectedNewTool,
    setSelectedNewTool,

    toolOperationDescription,
    setToolOperationDescription,

    items,
  }

  return (
    <CreateSetupContext.Provider value={providerValues}>{children}</CreateSetupContext.Provider>
  )
}

export function useCreateSetup(): CreateSetupContextData {
  const context = useContext(CreateSetupContext)
  if (!context) {
    throw new Error('useCreateSetup must be used within a CreateSetupProvider')
  }
  return context
}
