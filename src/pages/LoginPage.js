import React, { useState } from 'react'

const LoginPage = () => {
  const [password, setPassword] = useState('')
  return (
     <div>
       <h1>Вход</h1>
       <input
          type="text"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}/>
     </div>
  )
}

export default LoginPage