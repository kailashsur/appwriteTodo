import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../store/features/authSlice'
import appwriteService from '../../appwrite/auth'
import { useNavigate } from 'react-router-dom'

export default function LogoutButton() {
    const [loader, setLoader] = useState("Logout")
    const cookieFallback = JSON.parse(localStorage.getItem('cookieFallback'))
    const getLocalAuth = JSON.parse(localStorage.getItem('Auth'))
    const dispatch = useDispatch()
    const navigate = useNavigate()



    const logoutHandel = async () => {
        try {

            if (cookieFallback !== null && cookieFallback.length !== 0) {
                setLoader("Loading")
                const logoutRes = await appwriteService.logoutAccount()
                if (logoutRes) {
                    dispatch(logout())
                    navigate("/login")
                }
            }

        } catch (error) {
            throw error
        } finally {
            setLoader("Deleting")
            localStorage.setItem('Auth', JSON.stringify({
                status: false,
                userData: null
            }))

            localStorage.setItem('cookieFallback', JSON.stringify([]))
            localStorage.setItem('Todos', JSON.stringify([]))
            navigate("/login")
        }

    }


    return (
        <button className=' px-4 py-2 rounded-lg bg-orange-700 active:bg-orange-600 hover:bg-orange-800'
            onClick={logoutHandel}
        >
            {loader}
        </button>
    )
}
