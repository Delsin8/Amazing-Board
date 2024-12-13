import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignupPage from './pages/Signup'
import BoardsPage from './pages/Boards'
import BoardPage from './pages/Board'
import './index.css'
import HomePage from './pages/Home'
import { SocketProvider } from './context/SocketProvider'

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
    path: 'users/signup',
    element: <SignupPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <SocketProvider>
    <RouterProvider router={router} />
  </SocketProvider>
  // </React.StrictMode>
)
