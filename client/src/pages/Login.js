import React, {useState, useContext } from 'react'
import axios from "axios"; 
import {useNavigate} from 'react-router-dom'
import {AuthContext} from '../helpers/AuthContext'

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {setAuthState} = useContext(AuthContext)

    let navigate = useNavigate()

    const login = () => {
    
      const data = {username: username, password: password }

      axios.post("http://localhost:3001/auth/login", data).then((response) => {
        if (response.data.error) {
          alert(response.data.error)
        }else {
          localStorage.setItem("accessToken", response.data.Token)
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true
          })
          navigate("/")

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
