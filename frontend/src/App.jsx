import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import AllAuthor from './pages/AllAuthor'
import Blogs from './pages/Blogs'
import SingleBlog from './pages/SingleBlog'
import UpdateBlog from './pages/UpdateBlog'
import { Toaster } from "react-hot-toast";
import { Context } from './main'
import { useContext } from 'react'
import Navbar from './layout/Navbar'
import axios from 'axios'
import Dashboard from './pages/Dashboard'
import { useEffect } from 'react'
const App = () => {
  // const { setUser, isAuthenticated, setIsAuthenticated, user, setBlogs } =
  // useContext(Context);
// const fetchuser = async() =>{
// try{
// const {data} = await axios.get('http://localhost:5000/api/v1/user/myprofile',{
//   withCredentials:true
// })
// console.log(data)
// }catch(error){
// console.log(error.response.data.message)
// }
// }
const { setUser, isAuthenticated, setIsAuthenticated, user, setBlogs } =
useContext(Context);
useEffect(() => {
const fetchUser = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:5000/api/v1/user/myprofile",
      {
        withCredentials: true,
      }
    );
    //  console.log(data)
    setUser(data.user);
    setIsAuthenticated(true);
  } catch (error) {
    console.log(error);
    setIsAuthenticated(false);
    setUser({});
  }
};
const fetchBlogs = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:5000/api/v1/blog/getallblogs",
      { withCredentials: true }
    );
    //  console.log(data)
    setBlogs(data.blogs);
  } catch (error) {
    setBlogs([]);
  }
};
fetchUser();
fetchBlogs();
}, [isAuthenticated, user]);
  return (
    <div>

<BrowserRouter>
<Navbar/>
  <Routes>
  <Route path='/' element={<Home/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/about' element={<About/>}></Route>
    <Route path='/Blogs' element={<Blogs/>}></Route>
    <Route path='/blog/:id' element={<SingleBlog/>}></Route>
    <Route path='/allauthors' element={<AllAuthor/>}></Route>
    <Route path='/blog/update/:id' element={<UpdateBlog/>}></Route>
    <Route path="/dashboard" element={<Dashboard />} />

   
  </Routes>
</BrowserRouter>

<Toaster/>
    </div>
  )
}

export default App
