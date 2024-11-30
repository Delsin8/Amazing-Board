import axios from 'axios'
import React, { useEffect, useState } from 'react'

function useFetch<T>(url: string): [T | undefined, boolean, any] {
  const [data, setData] = useState<T>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsLoading(true)

    const fetchData = async () => {
      const { data } = await axios.get<T>(url)
      setData(data)
    }

    fetchData()
      .finally(() => setIsLoading(false))
      .catch(err => setError(err))
  }, [])

  return [data, isLoading, error]
}

export default useFetch
