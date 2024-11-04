import React, { useRef } from 'react'
import axios from 'axios'

const SignupPage = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body = JSON.stringify({
      username: nameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    })
    axios.post('http://localhost:5000/users/signup', body, {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return (
    <form onSubmit={submit}>
      <input type="text" name="username" placeholder="username" ref={nameRef} />
      <input type="email" name="email" placeholder="email" ref={emailRef} />
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
