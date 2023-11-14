import React from 'react'
import { useDispatch } from 'react-redux'
import { removeAll } from '../../store/features/todoSlice';

export default function ClearAll() {
    const dispatch = useDispatch();


    const clearAllHandel = ()=>{
        dispatch(removeAll())
    }


  return (
    <button 
    onClick={clearAllHandel}
    className=' bg-red-500 text-white px-4 py-2 rounded-lg'>
    Clear All</button>
  )
}
