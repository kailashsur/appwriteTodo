import React, { useEffect, useState } from 'react'
import Button from '../Elements/Button'
import { Link, useNavigate } from 'react-router-dom'
import appwriteService from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { login } from '../store/features/authSlice'



export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loader, setLoader] = useState("")
  const cookieFallback = JSON.parse(localStorage.getItem('cookieFallback'))   // ini =null  , initial = [] and insted = {a_ssionid:8843924whrighdf}
  const getLocalAuth = JSON.parse(localStorage.getItem('Auth'))       // initial = false and insted = true
  const dispatch = useDispatch();
  const navigate = useNavigate();




  const loginClick = async () => {
    setError("")

    if (email !== "" && password !== "") {
      setError("")
      setLoader("Loading...")

      try {

        const session = await appwriteService.loginAccount({email, password})
        if (session) {
          const userData = await appwriteService.getCurrentAccount();
          if (userData) dispatch(login(userData));
          navigate("/")
        }

      } catch (error) {
        setError("Login.jsx :: loginClick() :: error is :: ", error)
        console.log("Login.jsx :: loginClick() :: error is :: ", error);
      }
    } else {
      setError("Please enter valid info")
    }
  }

  useEffect(()=>{
    if(getLocalAuth.status == true && cookieFallback.length !== 0){
      navigate("/")
    }
  },[])



  return (
    <section className='flex flex-col gap-4'>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
        type="email"
        className=' px-4 py-2 rounded-lg text-black focus:outline-none border'
      />

      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
        type="password"
        className=' px-4 py-2 rounded-lg text-black focus:outline-none border'
      />

      <div>{loader}</div>
      <div>{error}</div>
      <div>
        <Button className="w-full bg-indigo-700 rounded-lg text-white active:bg-indigo-400 px-4 py-2 hover:bg-indigo-900"
          onClick={loginClick}
          title="Login"
        />
        <Link to="/signup" className=' hover:text-orange-400'> You do not have an account?</Link>
      </div>
    </section>
  )
}
