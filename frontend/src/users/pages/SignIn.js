import React from 'react'
import "./SignIn.css"

const SignIn = () => {
  return (
    <div className='flex justify-center pt-20'>
    <div className='signinSection'>
    <form action="#" method="POST" className="signinForm" name="signinform">
    <p className='text-2xl'>Sign In</p>
    <ul className="noBullet">
      <li>
        <label htmlFor="email"></label>
        <input type="email" className="inputFields" id="email" name="email" placeholder="Email" autoComplete='off' required/>
      </li>
      <li>
        <label htmlFor="password"></label>
        <input type="password" className="inputFields" id="password" name="password" placeholder="Password" required/>
      </li>
      <li id="center-btn">
        <input type="submit" id="join-btn" name="join" alt="Join" value="Submit"></input>
      </li>
    </ul>
  </form>
  </div>
  </div>
  )
}

export default SignIn