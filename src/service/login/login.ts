import { tyRequest } from '../index'
import { IAccount, IDataType, ILoginResult } from '@/service/login/type'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法: /users/1
  UserMenus = '/role/' // 用法: role/1/menu
}

export function userLogin(account: IAccount) {
  return tyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfo(id: number) {
  return tyRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenus(id: number) {
  return tyRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}

export function requestAllMenus(url: string) {
  return tyRequest.post<IDataType>({
    url
  })
}
