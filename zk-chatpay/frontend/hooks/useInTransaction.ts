import { useState, useCallback } from 'react'

const useInTranscation = <
  T extends (params: any) => void | Promise<any> | null | undefined
>(
  transcationFunc: T
) => {
  const [inTransaction, setInTransaction] = useState(false)
  const execTransaction = useCallback(
    async (params: any) => {
      try {
        setInTransaction(true)
        const res = await transcationFunc(params)
        setInTransaction(false)
        return res
      } catch (_) {
        setInTransaction(false)
      }
    },
    [transcationFunc]
  ) as T

  return { inTransaction, execTransaction }
}

export default useInTranscation
