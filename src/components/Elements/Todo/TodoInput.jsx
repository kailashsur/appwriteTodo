import React, { useState } from 'react'
import Input from '../Input'
import Button from '../Button'
import { useDispatch } from 'react-redux'
import { addTodo } from '../../store/features/todoSlice';

export default function TodoInput() {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");

  const addTodoHandel = ()=>{
    dispatch(addTodo(todo))
    setTodo("")
  }


  return (
    <div>
        <Input 
        value={todo}
        onChange={(e)=>setTodo(e.target.value)}
        css="text-black bg-cyan-300 focus:outline-none"
        type="text" placeholder="Enter your task"/>
        <Button
        onClick={addTodoHandel}
        title="Add" css="mx-2" />
    </div>
  )
}
