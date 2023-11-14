import React from 'react'

export default function Input(props) {
  return (
    <input 
    type={props.type}
    value={props.value}
    {...props}
    className={`px-4 py-2 rounded-lg ${props.css}`}
    />
  )
}
