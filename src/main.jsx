import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Account, Home, Layout, Login, Signup } from './components/index.js'
import { Provider } from 'react-redux'
import store from './components/store/store'
import AuthLayout from './AuthLayout.jsx'



const cookieFallback = JSON.parse(localStorage.getItem('cookieFallback'))
const getLocalAuth = JSON.parse(localStorage.getItem('Auth'))



if (!cookieFallback || cookieFallback == []) {

  if (!getLocalAuth) {
    localStorage.setItem('Auth', JSON.stringify({
      status: false,
      userData: null
    }))

    localStorage.setItem('cookieFallback', JSON.stringify([]))
    localStorage.setItem('Todos', JSON.stringify([]))

  }


}



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/signup",
        element: <AuthLayout authentication={false} >
          <Signup />
        </AuthLayout>
      },
      {
        path: "/login",
        element: <AuthLayout authentication={false}>
          <Login />
        </AuthLayout>
      },
      {
        path: "/account",
        element: <AuthLayout authentication={true}>
          <Account />          
        </AuthLayout>
      }

    ]
  }
])






ReactDOM.createRoot(document.getElementById('root')).render(

  <>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </>,

)
