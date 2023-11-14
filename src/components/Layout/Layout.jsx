import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../Elements/Header/Header'

export default function Layout() {


  return (
    <>
      <Header />
      <section className='w-full h-screen flex flex-col justify-center items-center'>
        <Outlet />

      </section>
    </>
  )
}
