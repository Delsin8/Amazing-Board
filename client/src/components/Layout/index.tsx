import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main className="h-[calc(100%-4rem)] pt-4">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
