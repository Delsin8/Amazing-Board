import React, { useRef } from 'react'
import apiClient from '../../api/apiClient'

const SignInPage = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body = JSON.stringify({
      username: nameRef.current?.value,
      password: passwordRef.current?.value,
    })
    apiClient.post<{ token: string }>(
      'http://localhost:5000/users/signin',
      body,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  const test = () => {
    apiClient.get('http://localhost:5000/users/protected', {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return (
    <form onSubmit={submit}>
      <input type="text" name="username" placeholder="username" ref={nameRef} />
      <input
        type="password"
        name="password"
        placeholder="password"
        ref={passwordRef}
      />
      <button type="submit">Save</button>

      <button type="button" onClick={test}>
        Send request
      </button>
    </form>
  )
}

export default SignInPage
