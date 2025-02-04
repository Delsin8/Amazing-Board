import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles.scss'

import {
  BoardListPage,
  BoardPage,
  NotFoundPage,
  SignInPage,
  SignupPage,
} from 'pages'

import Layout from './components/Layout'

import { store } from 'app/store'
import { SocketProvider } from 'context/SocketProvider'
import { handleTokenInInterceptor } from 'api/apiClient'

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/boards" replace />,
      },
      {
        path: '/boards',
        element: <BoardListPage />,
      },
      {
        path: '/boards/:boardId',
        element: <BoardPage />,
      },
      {
        path: 'users/signin',
        element: <SignInPage />,
      },
      {
        path: 'users/signup',
        element: <SignupPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])

handleTokenInInterceptor(store.dispatch)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <SocketProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </SocketProvider>
  </Provider>
)
