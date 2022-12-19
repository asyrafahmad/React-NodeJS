import React, {useState} from 'react'
import axios from "axios"; 

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const login = () => {
    
        const data = {username: username, password: password }

        axios.post("http://localhost:3001/auth/login", data).then((response) => {
            console.log(data)
        })
    }

  return (
    <div><br/><br/>
        Username :  
        <input type="text" onChange={(event) => { setUsername(event.target.value) }} />
        <br/><br/>
        Password :  
        <input type="password" onChange={(event) => { setPassword(event.target.value) }} />
        <br/><br/>
        <button type="submit" onClick={login}>Submit</button>
    </div>
  )
}

export default Login
