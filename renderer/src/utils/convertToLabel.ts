export const convertToLabel = (text: string) =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .toUpperCase()
    .replaceAll('-', ' ')
    .trim()
