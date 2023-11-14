import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const auth = JSON.parse(localStorage.getItem('Auth'))
    const authStatus = auth.status


    useEffect(() => {
        /**
        
        If authentication is true and authStatus is not true, it navigates to the login page. If authentication is false and authStatus is not false, it navigates to the home page.
The setLoader(false) is then called, indicating that the loading state is over.
        
         */

        if (authentication && authStatus !== authentication) {
            navigate("/login")
        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}

