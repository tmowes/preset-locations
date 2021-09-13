import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

// import { providersData } from '../data/providers'
// import { machinesData } from '../data/machines'
// import { UsedToolItem } from '../contexts/ToolLifeProvider/types'

export const parseFileContenttoState = (content: string[]) => {
  const endOfLife = Boolean(content[0])
  const toolSample = Number(content[1])
  // stream.write(`${selectedTool.label}\r\n`)

  // const selectedProvider =
  //   providersData.filter(provider => provider.label.includes(content[3]))[0] ?? null

  // const selectedMachine =
  //   machinesData.filter(machine => machine.label.includes(content[4]))[0] ?? null

  // stream.write(`${reason}\r\n`) 5

  // stream.write(`${totalDepths}\r\n`) 6

  // stream.write(`${totalQuantities}\r\n`) 7

  // stream.write(`${costPerUnit}\r\n`) 8

  // stream.write(`${updateAt}\r\n`) 9

  // stream.write(`${host}\r\n`) 10

  const usedToolItems = []
  for (let i = 11; i <= content.length - 2; i += 5) {
    const item = content[i].trim()
    if (item) {
      usedToolItems.push({
        id: format(new Date(), 'dd-MM-yyyy-HH-mm-ss-SSSS', { locale: ptBR }) + i,
        date: content[i].trim(),
        itemID: content[i + 1].trim(),
        quantity: Number(content[i + 2].trim()),
        depth: Number(content[i + 3].trim()),
        totalDepth: Number(content[i + 4].trim()),
      })
    }
  }

  return { endOfLife, toolSample, usedToolItems }
}
