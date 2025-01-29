import { Link } from 'react-router-dom'
import { LogoIcon } from '../../../assets/layout-icons'
import React from 'react'
import Button from '../../ui/Button'

const Header: React.FC = () => {
  const isLoggedIn = true
  const username = 'John'

  return (
    <header
      className="h-16 px-16 flex justify-between gap-3 border-b"
      role="banner"
    >
      <div className="logo">
        <a href="/" aria-label="Homepage">
          <LogoIcon />
        </a>
      </div>

      <nav className="nav" aria-label="Main Navigation">
        <ul className="h-full flex items-center gap-8">
          <li>
            <Link to="/boards">Boards</Link>
          </li>
          {!isLoggedIn ? (
            <li>{username}</li>
          ) : (
            <>
              <li>
                <Link to="/users/signin">Sign in</Link>
              </li>
              <li>
                <Link to="/users/signup">
                  <Button variant="dark" className="!rounded-full px-3">
                    Sign up
                  </Button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header
