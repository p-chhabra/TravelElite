import React from 'react'

const Button = (props) => {
  return (
    <button className={`p-3 ${props.className}`} onClick={props.onClick}></button>
  )
}

export default Button