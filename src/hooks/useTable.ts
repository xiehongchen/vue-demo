import usePagination from './usePagination'
import { ref } from 'vue'

interface Options<T> {
  formatResult: (data: T[]) => any
  onSuccess?: () => void
  immediate?: boolean
  rowkey?: keyof T
}

type PaginationParams = {
  page: number
  size: number
}

/**
 * Api<T> 泛型类型，接受一个类型参数T
 * params: PaginationParams 函数类型的签名部分，表示函数接受一个参数params
 * Promise<ApiRes<PageRes<T[]>>>  函数的返回类型，表示一个promise对象，
 * 该promise解析的值是一个ApiRes对象，这个APiRes对象包含一个PageRes<T[]>类型的数据
 */
type Api<T> = (params: PaginationParams) => Promise<ApiRes<PageRes<T[]>>>

export default function <T>(api: Api<T>, options?: Options<T>) {
  const { formatResult, onSuccess, immediate } = options || {}
  const { pagination, setTotal, changeCurrent, changePageSize } = usePagination(() => getTableData())
  const loading = ref(false)
  const tableData = ref<T[]>([])

  // 获取数据
  const getTableData = async () => {
    try {
      loading.value = true
      const res = await api({
        page: pagination.current,
        size: pagination.pageSize
      })
      console.log('res', res)
      tableData.value = formatResult ? formatResult(res.data.records) : res.data.records
      setTotal(res.data.total)
      onSuccess && onSuccess()
    } finally {
      loading.value = false
    }
  }

  // 是否立即获取数据
  const isImmediate = immediate ?? true
  isImmediate && getTableData()

  return {
    loading,
    tableData,
    getTableData,
    changeCurrent,
    changePageSize,
    pagination
  }

}