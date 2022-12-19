// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

function App() {

  return (
    <div className="App">
      <Router>
        <Link to="/"> Home Page</Link><br/>
        <Link to="/createpost"> Create A Post</Link><br/>
        <Link to="/login"> Login</Link><br/>
        <Link to="/registration"> Register</Link><br/>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/createpost"  element={<CreatePost />} />
          <Route path="/post/:id"  element={<Post />} />
          <Route path="/login"  element={<Login />} />
          <Route path="/registration"  element={<Registration />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
