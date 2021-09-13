import { tools } from '../data/tools'
import { convertPtBrDateToTime } from './convertPtBrDateToTime'

export const parseFilePendingRequestToState = (content: string[]) => {
  const host = content[0].trim()
  const requester = content[1].trim()
  const dateTime = content[2].trim()
  const machine = content[3].trim()
  const time = convertPtBrDateToTime(content[2].trim())

  const requestedToolsItems = []
  for (let i = 4; i <= content.length - 2; i += 3) {
    const item = content[i].trim()
    if (item) {
      requestedToolsItems.push({
        quantity: Number(content[i].trim()),
        tool: tools.find(t => t.id === content[i + 1].trim()).label,
        reason: content[i + 2].trim(),
      })
    }
  }

  return {
    host,
    requester,
    dateTime,
    time,
    machine,
    requestedToolsItems,
  }
}
