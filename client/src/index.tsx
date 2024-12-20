import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignupPage from './pages/SignUp'
import BoardsPage from './pages/Boards'
import BoardPage from './pages/Board'
import './index.css'
import HomePage from './pages/Home'
import { SocketProvider } from './context/SocketProvider'
import SignInPage from './pages/SignIn'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/boards',
    element: <BoardsPage />,
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
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SocketProvider>
    <RouterProvider router={router} />
  </SocketProvider>
)
