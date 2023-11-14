import React from 'react'

export default function Button(props) {
  return (
    <button 
    type={props.type}
    className={`bg-indigo-700  text-white rounded-lg px-5 py-2 active:bg-indigo-400 ${props.css}`}
    {...props}
    >
      {props.title}
    </button>
  )
}
