import fs from 'fs'
import path from 'path'

const folderPath1 = ['..', 'app-preset-solicitante', 'requests']
const folderPath2 = ['..', '..', 'Solicitação de Ferramentas', 'Pedido']

export const readMultipleFoldersFileNames = () => {
  const files1 = readSingleFolderFileNames(path.join(...folderPath1))
  const files2 = readSingleFolderFileNames(path.join(...folderPath2))
  return [...files1, ...files2]
}

export const readSingleFolderFileNames = (folderPath: string) =>
  fs.readdirSync(folderPath).map(file => ({ id: file, path: folderPath }))
