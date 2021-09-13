import { AppProviderProps } from './types'

export const AppProvider = (props: AppProviderProps) => {
  const { children } = props
  return <>{children}</>
}
