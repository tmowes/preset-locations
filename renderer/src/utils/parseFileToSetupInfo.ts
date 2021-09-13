export const parseFileToSetupInfo = (content: string[]) => {
  const id = String(content[0]).trim()
  const label = String(content[1]).trim()

  return { id, label }
}
