import React from 'react'
import { Link } from 'react-router-dom'
import './VisitUser.css'

const VisitUser = (props) => {
  return (
    <div className="card">

  <div className="title">{props.name}</div>

  <div className="icon">
    <img src={props.src} alt="IMG" />
  </div>

  <div className="features">
    <ul>
      <li>Total Places: <span>{props.places}</span></li>
      <li>Total Rating: <span>{props.rating}</span></li>
    </ul>
  </div>

  <Link to="#" className="btn">Visit Profile</Link>

</div>
  )
}

export default VisitUser