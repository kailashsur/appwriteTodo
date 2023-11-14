import React, { useEffect, useState } from 'react'
import Todo from './Todo'
import { useDispatch, useSelector } from 'react-redux';
import Input from '../Input';
import Button from '../Button';
import { addTodo, removeAll, removeTodo } from '../../store/features/todoSlice';


export default function TodoWrapper() {
  const listTodo = JSON.parse(localStorage.getItem('Todos'))
  const [todos, setTodos] = useState()


  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");
  const listStateTodo = useSelector((state)=>state.todo)

  const addTodoHandel = ()=>{
    dispatch(addTodo(todo))
    setTodo("")
  }


  useEffect(()=>{
    setTodos(listTodo)
  },[todo, addTodo, removeAll, removeTodo, listStateTodo])


  return (
    <section>
     
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


      <div className='flex flex-col gap-2 my-4'>
        {
          todos ?
          todos.map((todo) => {
            return (

              <div key={todo.id}>
                <Todo id={todo.id} text={todo.text} />
              </div>
            )
          }) : null
        }
      </div>
    </section>
  )
}
