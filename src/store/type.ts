import { ILoginState } from '@/store/login/type'
import { ISystemState } from '@/store/main/system/type'
import { IDashboardState } from '@/store/main/dashboard/type'

export interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}

export type IStoreType = IRootState & IRootWithModule
