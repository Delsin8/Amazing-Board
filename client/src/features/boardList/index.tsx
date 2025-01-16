import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchBoardList } from './boardListSlice'

const BoardList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchBoardList())
  }, [])

  return <div>123</div>
}

export default BoardList
