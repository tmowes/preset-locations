import { convertToLabel } from './convertToLabel'
import { convertToSlug } from './convertToSlug'

export const parseFileToToolingInfo = (content: string[]) => {
  const toolingInfo = []
  for (let i = 0; i <= content.length - 2; i += 3) {
    const item = content[i].trim()
    if (item) {
      toolingInfo.push({
        id: convertToSlug(`${content[i + 1]}-${content[i + 2]}`),
        label: convertToLabel(content[i + 1]),
        position: content[i].trim(),
        toolID: content[i + 2].trim(),
      })
    }
  }

  return toolingInfo
}
