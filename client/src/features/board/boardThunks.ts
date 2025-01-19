import { createAsyncThunk } from '@reduxjs/toolkit'
import apiClient from '../../api/apiClient'

export const fetchBoard = createAsyncThunk(
  'board/fetchBoard',
  async (boardId: string) => {
    const response = await apiClient.get(`/boards/${boardId}`)
    if (response.status !== 200) {
      throw new Error('Failed to fetch board list')
    }
    return await response.data
  }
)

export const reorderCard = createAsyncThunk(
  'board/reorderCard',
  async (
    {
      cardId,
      listId,
      boardId,
      position,
    }: {
      cardId: string
      listId: string
      boardId: string
      position: number
    },
    { rejectWithValue }
  ) => {
    try {
      const body = JSON.stringify({
        cardId,
        listId,
        boardId,
        position,
      })
      const response = await apiClient.patch(`/cards/reorder`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status !== 200) {
        throw new Error('Failed to fetch board list')
      }
      return await response.data
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error?.message)
    }
  }
)

export const reorderList = createAsyncThunk(
  'board/reorderList',
  async (
    {
      listId,
      boardId,
      position,
    }: { listId: string; boardId: string; position: number },
    { rejectWithValue }
  ) => {
    try {
      const body = JSON.stringify({ listId, position, boardId })
      const response = await apiClient.patch(`/lists/reorder`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status !== 200) {
        throw new Error('Failed to fetch board list')
      }
      return await response.data
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error?.message)
    }
  }
)

export const sendUpdateCardName = createAsyncThunk(
  'board/updateCardName',
  async (
    {
      cardId,
      boardId,
      name,
    }: { cardId: string; boardId: string; name: string },
    { rejectWithValue }
  ) => {
    try {
      const body = JSON.stringify({ cardId, boardId, name })
      const response = await apiClient.patch(`/cards/rename`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status !== 200) {
        throw new Error('Failed to update name of the card')
      }
      return await response.data
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error?.message)
    }
  }
)
