import { convertToLabel } from './convertToLabel'

export const parseTxtToOperation = (content: string[]) => {
  const toolingInfo = []
  for (let i = 0; i <= content.length - 2; i += 3) {
    const item = content[i].trim()
    if (item) {
      toolingInfo.push(
        convertToLabel(content[i + 1])
          .replace(' ', '|')
          .split('|')[1]
      )
    }
  }

  return toolingInfo
}
