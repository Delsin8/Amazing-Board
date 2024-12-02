import axios from 'axios'
import React, { useEffect, useState } from 'react'

function useFetch<T>(
  url: string,
  defaultValue?: T
): [
  T | undefined,
  boolean,
  any,
  React.Dispatch<React.SetStateAction<T | undefined>>
] {
  const [data, setData] = useState<T | undefined>(defaultValue)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      const { data } = await axios.get<T>(`${process.env.API_URL}${url}`)
      setData(data)
    }

    fetchData()
      .finally(() => setIsLoading(false))
      .catch(err => setError(err))
  }, [])

  return [data, isLoading, error, setData]
}

export default useFetch
