import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignupPage from './pages/Signup'
import BoardsPage from './pages/Boards'
import BoardPage from './pages/Board'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div className="text-3xl font-bold underline">Hello world!</div>,
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
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
