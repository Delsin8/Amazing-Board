import apiClient from '../../api/apiClient'
import React, { useRef } from 'react'

const SignupPage = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body = JSON.stringify({
      username: nameRef.current?.value,
      password: passwordRef.current?.value,
    })
    apiClient.post('http://localhost:5000/users/signup', body, {
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
      <button>Save</button>
    </form>
  )
}

export default SignupPage
