import React from 'react'
import TodoWrapper from '../Elements/Todo/TodoWrapper'

export default function Home() {
  const localState = JSON.parse(localStorage.getItem('Auth'))

  if(localState.status == true) return (
    <section>
      <TodoWrapper/>
    </section>
  )
  return (
    <div>Please Login</div>
  )
}
