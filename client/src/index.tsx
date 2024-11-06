import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignupPage from './pages/Signup'
import BoardsPage from './pages/Boards'
import BoardPage from './pages/Board'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world! 1</div>,
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
