import type { MockMethod } from 'vite-plugin-mock'
import { resultSuccess } from '../_utils'

export default [
  {
    url: '/api/a',
    method: 'get',
    timeout: 300,
    response: () => {
      const data = {}
      return resultSuccess(data)
    }
  }
] as MockMethod[]