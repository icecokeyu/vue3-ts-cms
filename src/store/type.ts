import { ILoginState } from '@/store/login/type'

export interface IRootState {
  name: string
  age: number
}

interface IRootWithModule {
  login: ILoginState
}

export type IStoreType = IRootState & IRootWithModule
