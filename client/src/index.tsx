import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import SignupPage from './pages/SignUp'
import BoardsPage from './pages/Boards'
import BoardPage from './pages/Board'
import './styles.scss'
import { SocketProvider } from './context/SocketProvider'
import SignInPage from './pages/SignIn'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { handleTokenInInterceptor } from './api/apiClient'
import Layout from './components/Layout'
import NotFoundPage from './pages/NotFound'

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
