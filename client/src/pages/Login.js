import React, {useState} from 'react'
import axios from "axios"; 
import {useNavigate} from 'react-router-dom'

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    let navigate = useNavigate()

    const login = () => {
    
      const data = {username: username, password: password }

      axios.post("http://localhost:3001/auth/login", data).then((response) => {
        if (response.data.error) {
          alert(response.data.error)
        }else {
          sessionStorage.setItem("accessToken", response.data.Token)
          navigate.push("/")
          
          console.log(response.data)
        }
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
