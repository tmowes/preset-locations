export const convertPtBrDateToTime = (dateTime: string) => {
  const date = dateTime.split(' ')[0].split('/')
  const time = dateTime.split(' ')[1].split(':')

  const day = Number(date[0])
  const month = Number(date[1])
  const year = Number(date[2].split(' ')[0])

  const hour = Number(time[0])
  const minute = Number(time[1])
  const second = Number(time[2])

  return new Date(year, month, day, hour, minute, second).getTime()
}
