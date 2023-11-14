import React, { useState, useEffect } from 'react'
import Button from '../Elements/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import appwriteService from '../../appwrite/auth'
import { login } from '../store/features/authSlice'

export default function Signup() {
  const [error, setError] = useState("")
  const [loader, setLoader] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const cookieFallback = JSON.parse(localStorage.getItem('cookieFallback'))
  const getLocalAuth = JSON.parse(localStorage.getItem('Auth'))
  const dispatch = useDispatch()
  const navigate = useNavigate();

  //------------------- declaration ends here ------------------------------------

  const signupClick = async () => {
    setError("")

    if (name !== "" && email !== "" && password !== "") {
      setError("")
      setLoader("Loading...")


      try {

        const createRes = await appwriteService.createAccount({email, password, name})
        if (createRes) {
          const userData = await appwriteService.getCurrentAccount()
          if (userData) dispatch(login(userData));
          navigate("/")
        }
      } catch (error) {
        setError("Signup.jsx :: signupClick() :: error is :: ", error)
        console.log("Signup.jsx :: signupClick() :: error is :: ", error);
      }
    } else {
      setError("Please enter valid info")
    }

  }

  useEffect(()=>{
    if(getLocalAuth.status == true && cookieFallback.length !== 0){
      setTimeout(navigate("/"), 5000)
    }
  },[])



  //-------------------return statements starts ------------------------
  return (
    <section className='flex flex-col gap-4'>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Full Name'
        type="text"
        className=' px-4 py-2 rounded-lg text-black focus:outline-none border'
      />

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

      <div>{error}</div>

      <Button
        title="Signup"
        onClick={signupClick}
      />

      <div>
        <Link to="/login" className=' hover:text-orange-400'>Alredy have an account?</Link>
      </div>
    </section>
  )
}
