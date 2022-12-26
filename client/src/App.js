// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import PageNotFound from "./pages/PageNotFound";

import { AuthContext } from './helpers/AuthContext'
import { useEffect, useState } from "react"
import axios from 'axios'

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false
  })

  useEffect(() => {
    axios.get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken")
        }
      })
      .then((response) => {
        if(response.data.error) {
          setAuthState({
            ...authState, status: false
          })

          // const buttonHandler = () => {
          //   setAuthState(false)
          // }
        } else {
          setAuthState({
            username: response.data.validToken.username,
            id: response.data.validToken.id,
            status: true
          })

          // const buttonHandler = () => {
          //   setAuthState(true)
          // }
        }

        // console.log(response)
      });
  }, [setAuthState])

  const logout = () => {
    localStorage.removeItem("accessToken")
    setAuthState({
      username: "",
      id: 0,
      status: false
    })
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            {!authState.status ? (
              <>
                <Link to="/login"> Login</Link><br/>
                <Link to="/registration"> Register</Link><br/>
              </>
            ) : (
              <>
                <Link to="/"> Home Page</Link><br/>
                <Link to="/createpost"> Create A Post</Link><br/>
                <button onClick={logout}>Logout</button>
                <h3>{authState.username}</h3>
              </>
            )}

          </div>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/createpost" exact element={<CreatePost />} />
              <Route path="/post/:id" exact element={<Post />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/registration" exact element={<Registration />} />
              <Route path="*" exact element={<PageNotFound />} />
            </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
