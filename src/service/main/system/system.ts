import { tyRequest } from '@/service'
import { IDataType } from '@/service/login/type'

export function getPageDataList(url: string, queryInfo: object) {
  return tyRequest.post<IDataType>({
    url,
    data: queryInfo
  })
}

export function deletePageData(url: string) {
  return tyRequest.delete<IDataType>({
    url
  })
}

export function createPageData(url: string, createInfo: object) {
  return tyRequest.post<IDataType>({
    url,
    data: createInfo
  })
}

export function updatePageData(url: string, updateInfo: object) {
  return tyRequest.patch<IDataType>({
    url,
    data: updateInfo
  })
}
