import React, { useRef } from 'react'
import axios from 'axios'
import apiClient from '../../api/apiClient'

const SignInPage = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body = JSON.stringify({
      username: nameRef.current?.value,
      password: passwordRef.current?.value,
    })
    axios
      .post<{ token: string }>('http://localhost:5000/users/signin', body, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(({ data }) => {
        const token = data.token
        localStorage.setItem('token', token)
      })
  }

  const test = () => {
    apiClient.get('http://localhost:5000/users/protected', {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return (
    <form onSubmit={submit}>
      <input type="text" name="username" placeholder="username" ref={nameRef} />
      {/* <input type="email" name="email" placeholder="email" ref={emailRef} /> */}
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
