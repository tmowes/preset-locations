import fs from 'fs'

import { convertToLabel } from './convertToLabel'
import { convertToSlug } from './convertToSlug'

export const fileOptions = { encoding: 'ascii' as BufferEncoding }

export const createItemDirAndInnerFiles = (selectedMachineLabel: string, itemlabel: string) => {
  const dirOptions = { recursive: true }
  const machineSlug = convertToSlug(selectedMachineLabel)
  const machineLabel = convertToLabel(selectedMachineLabel)
  fs.mkdirSync(`./setupConfig/${machineSlug}/${itemlabel}`, dirOptions)
  const createBaseInfo = fs.createWriteStream(
    `./setupConfig/${machineSlug}/${itemlabel}/baseInfo.txt`,
    fileOptions
  )
  createBaseInfo.once('open', () => {
    createBaseInfo.write(`${itemlabel}\r\n`)
    createBaseInfo.write(`${itemlabel} - ${machineLabel}\r\n`)
    createBaseInfo.end()
  })
  fs.createWriteStream(`./setupConfig/${machineSlug}/${itemlabel}/setupInfo.txt`, fileOptions)
  fs.createWriteStream(`./setupConfig/${machineSlug}/${itemlabel}/toolingInfo.txt`, fileOptions)

  return {
    id: itemlabel,
    label: `${itemlabel} - ${machineLabel}`,
  }
}
