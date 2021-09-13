import fs from 'fs'

import { SetupInfo, ToolingInfo } from '../contexts/CreateSetupProvider/types'
import { convertToSlug } from './convertToSlug'
import { parseFileToBaseInfo } from './parseFileToBaseInfo'
import { parseFileToSetupInfo } from './parseFileToSetupInfo'
import { parseFileToToolingInfo } from './parseFileToToolingInfo'

export type ParsedContents = {
  baseInfo: SetupInfo
  setupInfo: SetupInfo
  toolingInfo: ToolingInfo[]
}

export const readItemConfigFromFiles = async (
  selectedMachineLabel: string,
  itemlabel: string
) => {
  const machineSlug = convertToSlug(selectedMachineLabel)
  const pathToBaseInfo = `./setupConfig/${machineSlug}/${itemlabel}/baseInfo.txt`
  const pathToSetupInfo = `./setupConfig/${machineSlug}/${itemlabel}/setupInfo.txt`
  const pathToToolingInfo = `./setupConfig/${machineSlug}/${itemlabel}/toolingInfo.txt`
  const parsedContents = {} as ParsedContents

  const streamBaseInfo = fs.createReadStream(pathToBaseInfo)
  streamBaseInfo.once('open', () => {
    streamBaseInfo.on('data', chunk => {
      const content = chunk.toString().split('\n')
      const baseInfo = parseFileToBaseInfo(content)
      Object.assign(parsedContents, { baseInfo })
    })
  })

  const streamSetupInfo = fs.createReadStream(pathToSetupInfo)
  streamSetupInfo.once('open', () => {
    streamSetupInfo.on('data', chunk => {
      const content = chunk.toString().split('\n')
      const setupInfo = parseFileToSetupInfo(content)
      Object.assign(parsedContents, { setupInfo })
    })
  })

  const streamToolingInfo = fs.createReadStream(pathToToolingInfo)
  streamToolingInfo.once('open', () => {
    streamToolingInfo.on('data', chunk => {
      const content = chunk.toString().split('\n')
      const toolingInfos = parseFileToToolingInfo(content)
      Object.assign(parsedContents, { toolingInfo: [...toolingInfos] })
    })
  })

  return parsedContents
}
