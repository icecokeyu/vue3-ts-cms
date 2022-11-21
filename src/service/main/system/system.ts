import { tyRequest } from '@/service'
import { IDataType } from '@/service/login/type'

export function getPageDataList(url: string, queryInfo: object) {
  return tyRequest.post<IDataType>({
    url,
    data: queryInfo
  })
}
