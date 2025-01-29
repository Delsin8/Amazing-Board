import React, { useState } from 'react'
import Button from '../../components/ui/Button'
import InputText from '../../components/ui/InputText/InputText'

const SignInPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSignin = () => {}

  return (
    <div className="w-full h-full flex justify-center items-center pb-20">
      <div className="w-80 flex flex-col gap-4">
        <InputText
          placeholder="Username"
          value={username}
          onChange={setUsername}
        />
        <InputText
          placeholder="Password"
          type="password"
          value={password}
          onChange={setPassword}
        />

        <Button variant="dark" onClick={handleSignin}>
          Sign in
        </Button>
      </div>
    </div>
  )
}

export default SignInPage
