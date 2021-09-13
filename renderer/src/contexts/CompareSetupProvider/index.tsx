import { createContext, useContext, useEffect, useState } from 'react'

import fs from 'fs'

import {
  CompareSetupContextData,
  CompareSetupProviderProps,
  ItemsTestData,
  ToolingInfo,
} from './types'
import { SelectProps } from '../StaticDataProvider/types'
import { tools } from '../../data/tools'
import { parseFileToBaseInfo } from '../../utils/parseFileToBaseInfo'
import { parseFileToSetupInfo } from '../../utils/parseFileToSetupInfo'
import { parseFileToToolingInfo } from '../../utils/parseFileToToolingInfo'
import { itemsTestData } from '../../data/itemsTest'

export const CompareSetupContext = createContext({} as CompareSetupContextData)

export const CompareSetupProvider = (props: CompareSetupProviderProps) => {
  const { children } = props
  const [selectedMachine, setSelectedMachine] = useState<SelectProps | null>(null)
  const [tempItems, setTempItems] = useState<SelectProps[]>([])
  const [selectedPrevItem, setSelectedPrevItem] = useState<SelectProps | null>(null)
  const [selectedNextItem, setSelectedNextItem] = useState<SelectProps | null>(null)
  const [prevItemInfo, setPrevItemInfo] = useState({} as ItemsTestData)
  const [nextItemInfo, setNextItemInfo] = useState({} as ItemsTestData)
  const [toolsEquals, setToolsEquals] = useState<ToolingInfo[]>([])
  const [toolsOnlyInPrev, setToolsOnlyInPrev] = useState<ToolingInfo[]>([])
  const [toolsOnlyInNext, setToolsOnlyInNext] = useState<ToolingInfo[]>([])
  const [prevItemBaseInfo, setPrevItemBaseInfo] = useState({} as SelectProps)
  const [prevItemSetupInfo, setPrevItemSetupInfo] = useState({} as SelectProps)
  const [prevItemToolingInfo, setPrevItemToolingInfo] = useState<ToolingInfo[]>([])
  const [nextItemBaseInfo, setNextItemBaseInfo] = useState({} as SelectProps)
  const [nextItemSetupInfo, setNextItemSetupInfo] = useState({} as SelectProps)
  const [nextItemToolingInfo, setNextItemToolingInfo] = useState<ToolingInfo[]>([])

  useEffect(() => {
    if (selectedMachine !== null && selectedPrevItem !== null && selectedNextItem !== null) {
      setPrevItemInfo({
        ...prevItemBaseInfo,
        machine: selectedMachine.id,
        setupInfo: prevItemSetupInfo,
        toolingInfo: prevItemToolingInfo.sort(),
      })
      setNextItemInfo({
        ...nextItemBaseInfo,
        machine: selectedMachine.id,
        setupInfo: nextItemSetupInfo,
        toolingInfo: nextItemToolingInfo.sort(),
      })
    }
  }, [
    nextItemBaseInfo,
    nextItemSetupInfo,
    nextItemToolingInfo,
    prevItemBaseInfo,
    prevItemSetupInfo,
    prevItemToolingInfo,
    selectedMachine,
    selectedNextItem,
    selectedPrevItem,
  ])

  useEffect(() => {
    if (selectedMachine !== null) {
      fs.readdir(`./setupConfig/${selectedMachine.id}`, (_, folders) => {
        if (folders.length > 0) {
          setTempItems(
            folders.map(folder => ({
              id: folder,
              label: folder.toLocaleUpperCase().replaceAll('-', ' '),
            }))
          )
        } else {
          setTempItems([])
        }
      })
    }
    setSelectedPrevItem(null)
    setSelectedNextItem(null)
    setPrevItemInfo({} as ItemsTestData)
    setNextItemInfo({} as ItemsTestData)
    setToolsEquals([])
    setToolsOnlyInPrev([])
    setToolsOnlyInNext([])
  }, [selectedMachine])

  useEffect(() => {
    if (selectedPrevItem !== null) {
      const pathToBaseInfo = `./setupConfig/${selectedMachine.id}/${selectedPrevItem.id}/baseInfo.txt`
      const pathToSetupInfo = `./setupConfig/${selectedMachine.id}/${selectedPrevItem.id}/setupInfo.txt`
      const pathToToolingInfo = `./setupConfig/${selectedMachine.id}/${selectedPrevItem.id}/toolingInfo.txt`

      const streamBaseInfo = fs.createReadStream(pathToBaseInfo)
      streamBaseInfo.once('open', () => {
        streamBaseInfo.on('data', chunk => {
          const content = chunk.toString().split('\n')
          const parsedContent = parseFileToBaseInfo(content)
          setPrevItemBaseInfo({ ...parsedContent })
        })
      })

      const streamSetupInfo = fs.createReadStream(pathToSetupInfo)
      streamSetupInfo.once('open', () => {
        streamSetupInfo.on('data', chunk => {
          const content = chunk.toString().split('\n')
          const parsedContent = parseFileToSetupInfo(content)
          setPrevItemSetupInfo({ ...parsedContent })
        })
      })

      const streamToolingInfo = fs.createReadStream(pathToToolingInfo)
      streamToolingInfo.once('open', () => {
        streamToolingInfo.on('data', chunk => {
          const content = chunk.toString().split('\n')
          const parsedContent = parseFileToToolingInfo(content)
          setPrevItemToolingInfo([...parsedContent])
        })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPrevItem])

  useEffect(() => {
    if (selectedNextItem !== null) {
      const pathToBaseInfo = `./setupConfig/${selectedMachine.id}/${selectedNextItem.id}/baseInfo.txt`
      const pathToSetupInfo = `./setupConfig/${selectedMachine.id}/${selectedNextItem.id}/setupInfo.txt`
      const pathToToolingInfo = `./setupConfig/${selectedMachine.id}/${selectedNextItem.id}/toolingInfo.txt`

      const streamBaseInfo = fs.createReadStream(pathToBaseInfo)
      streamBaseInfo.once('open', () => {
        streamBaseInfo.on('data', chunk => {
          const content = chunk.toString().split('\n')
          const parsedContent = parseFileToBaseInfo(content)
          setNextItemBaseInfo({ ...parsedContent })
        })
      })

      const streamSetupInfo = fs.createReadStream(pathToSetupInfo)
      streamSetupInfo.once('open', () => {
        streamSetupInfo.on('data', chunk => {
          const content = chunk.toString().split('\n')
          const parsedContent = parseFileToSetupInfo(content)
          setNextItemSetupInfo({ ...parsedContent })
        })
      })

      const streamToolingInfo = fs.createReadStream(pathToToolingInfo)
      streamToolingInfo.once('open', () => {
        streamToolingInfo.on('data', chunk => {
          const content = chunk.toString().split('\n')
          const parsedContent = parseFileToToolingInfo(content)
          setNextItemToolingInfo([...parsedContent])
        })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNextItem])

  useEffect(() => {
    if (prevItemInfo?.toolingInfo && nextItemInfo?.toolingInfo) {
      const arr1Sorted = prevItemInfo.toolingInfo.sort().map(item => item.id)
      const arr2Sorted = nextItemInfo.toolingInfo.sort().map(item => item.id)
      const equalId = arr1Sorted.filter(tool => arr2Sorted.includes(tool))
      const onlyPrevId = arr1Sorted.filter(tool => !arr2Sorted.includes(tool))
      const onlyNextId = arr2Sorted.filter(tool => !arr1Sorted.includes(tool))

      setToolsEquals(
        tools
          .map(tool =>
            prevItemInfo.toolingInfo
              .sort()
              .map(
                item =>
                  equalId.includes(item.id) &&
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
      )

      setToolsOnlyInPrev(
        tools
          .map(tool =>
            prevItemInfo.toolingInfo
              .sort()
              .map(
                item =>
                  onlyPrevId.includes(item.id) &&
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
      )

      setToolsOnlyInNext(
        tools
          .map(tool =>
            nextItemInfo.toolingInfo
              .sort()
              .map(
                item =>
                  onlyNextId.includes(item.id) &&
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
      )
    }
  }, [nextItemInfo, prevItemInfo])

  const createInfoFiles = () => {
    console.time('createInfoFiles')
    itemsTestData.forEach(item => {
      const checkdir = fs.existsSync(`./setupConfig/nomura-2/${item.id}`)
      if (!checkdir) {
        fs.mkdirSync(`./setupConfig/nomura-2/${item.id}`, { recursive: true })
      }

      const createBaseInfo = fs.createWriteStream(
        `./setupConfig/nomura-2/${item.id}/baseInfo.txt`,
        {
          encoding: 'ascii',
        }
      )
      createBaseInfo.once('open', () => {
        createBaseInfo.write(`${item.id}\r\n`)
        createBaseInfo.write(`${item.label}\r\n`)
        createBaseInfo.end()
      })
      const createSetupInfo = fs.createWriteStream(
        `./setupConfig/nomura-2/${item.id}/setupInfo.txt`,
        {
          encoding: 'ascii',
        }
      )
      createSetupInfo.once('open', () => {
        createSetupInfo.write(`${item.setupInfo.id}\r\n`)
        createSetupInfo.write(`${item.setupInfo.label}\r\n`)
        createSetupInfo.end()
      })
      const createToolingInfo = fs.createWriteStream(
        `./setupConfig/nomura-2/${item.id}/toolingInfo.txt`,
        {
          encoding: 'ascii',
        }
      )
      createToolingInfo.once('open', () => {
        item.toolingInfo.forEach(tool => {
          createToolingInfo.write(`${tool.position}\r\n`)
          createToolingInfo.write(`${tool.label}\r\n`)
          createToolingInfo.write(`${tool.toolID}\r\n`)
        })
        createToolingInfo.end()
      })
    })
    console.timeEnd('createInfoFiles')
  }

  const providerValues = {
    setSelectedPrevItem,
    setSelectedNextItem,
    setSelectedMachine,
    selectedMachine,
    selectedPrevItem,
    selectedNextItem,
    prevItemInfo,
    nextItemInfo,
    toolsEquals,
    toolsOnlyInPrev,
    toolsOnlyInNext,

    tempItems,
    createInfoFiles,
  }

  return (
    <CompareSetupContext.Provider value={providerValues}>{children}</CompareSetupContext.Provider>
  )
}

export function useCompareSetup(): CompareSetupContextData {
  const context = useContext(CompareSetupContext)
  if (!context) {
    throw new Error('useCompareSetup must be used within a CompareSetupProvider')
  }
  return context
}
