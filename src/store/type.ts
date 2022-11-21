import { ILoginState } from '@/store/login/type'
import { ISystemState } from '@/store/main/system/type'

export interface IRootState {
  name: string
  age: number
}

interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}

export type IStoreType = IRootState & IRootWithModule
