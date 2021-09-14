import fs from 'fs'

import { parseTxtToOperation } from './parseTxtToOperation'

const pathToToolingInfo = `./machineX/itemX/toolingInfo.txt`

export const readFiles = () => {
  const operations = []
  const streamToolingInfo = fs.createReadStream(pathToToolingInfo)
  streamToolingInfo.once('open', () => {
    streamToolingInfo.on('data', chunk => {
      const content = chunk.toString().split('\n')
      const toolingInfos = parseTxtToOperation(content)
      operations.push(toolingInfos)
    })
  })
  return operations
}
