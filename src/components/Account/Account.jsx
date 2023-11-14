import React from 'react'


export default function Account() {
  const userData = JSON.parse(localStorage.getItem('Auth'))


  if(userData.status == true || userData.status == true) {return (
    <section className='flex flex-col gap-2'>
      <div className=' text-center bg-cyan-700 text-white rounded-lg py-2 font-bold'>Account Details </div>
      <div className=' bg-cyan-950 text-white rounded-lg py-4 px-5 flex flex-col gap-3'>
        {
          userData.userData.name ?(
            <div> Mr/Mrs : {userData.userData.name}</div>
          ):(
            <div> Mr/Mrs : unknown</div>
          )
        }
        {
          userData.userData.email ? (
            <div>Email : {userData.userData.email} {
              userData.userData.emailVerification==true?(
                <span>{"(Verified)"}</span>
              ):(
                <span>{"(Unverified)"}</span>
              )
            }</div>
          ) : null
        }
        {
          userData.userData.phone ? (
            <div>Phone : {userData.userData.phone}</div>
          ) : null
        }

      </div>
    </section>
  )}
}
