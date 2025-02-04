import apiClient from 'api/apiClient'

import { createAsyncThunk } from '@reduxjs/toolkit'

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

export const sendUpdateListName = createAsyncThunk(
  'board/updateListName',
  async (
    {
      listId,
      boardId,
      name,
    }: { listId: string; boardId: string; name: string },
    { rejectWithValue }
  ) => {
    try {
      const body = JSON.stringify({ listId, boardId, name })
      const response = await apiClient.patch(`/lists/rename`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status !== 200) {
        throw new Error('Failed to update name of the list')
      }
      return await response.data
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error?.message)
    }
  }
)

export const sendUpdateListColor = createAsyncThunk(
  'board/updateListColor',
  async (
    {
      listId,
      boardId,
      color,
    }: { listId: string; boardId: string; color: string },
    { rejectWithValue }
  ) => {
    try {
      const body = JSON.stringify({ listId, boardId, color })
      const response = await apiClient.patch(`/lists/change-color`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status !== 200) {
        throw new Error('Failed to update color of the list')
      }
      return await response.data
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error?.message)
    }
  }
)

export const createCard = createAsyncThunk(
  'board/createCard',
  async (
    { listId, boardId }: { listId: string; boardId: string },
    { rejectWithValue }
  ) => {
    try {
      const body = JSON.stringify({ listId, boardId, name: 'Card' })
      const response = await apiClient.post(`/cards`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status !== 200) {
        throw new Error('Failed to update color of the list')
      }
      return await response.data
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error?.message)
    }
  }
)
