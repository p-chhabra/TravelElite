import React from 'react'
import './SignUp.css'

const SignUp = () => {
  return (
    <div className='flex items-center justify-center mt-20'>
    <div className="signupSection">
  <div className="info">
    <h2>Mission to Connect Travellers</h2>
    <i className="icon ion-ios-ionic-outline" aria-hidden="true"></i>
    <p>YourPlaces</p>
  </div>
  <form action="#" method="POST" className="signupForm" name="signupform">
    <p className='text-2xl'>Sign Up</p>
    <ul className="noBullet">
      <li>
        <label htmlFor="username"></label>
        <input type="text" className="inputFields" id="username" name="username" placeholder="Username"  required/>
      </li>
      <li>
        <label htmlFor="email"></label>
        <input type="email" className="inputFields" id="email" name="email" placeholder="Email" required/>
      </li>
      <li>
        <label htmlFor="password"></label>
        <input type="password" className="inputFields" id="password" name="password" placeholder="Password" required/>
      </li>
      <h1 className='pt-10'>Profile Picture (Optional)</h1>
      <li>
        <input type="file" className='inputFields inputImageField' name="profile-pic" accept='image/png, image/jpeg, image/jpg'/>
      </li>
      <li id="center-btn">
        <input type="submit" id="join-btn" name="join" alt="Join" value="Join"></input>
      </li>
    </ul>
  </form>
</div>
</div>
  )
}

export default SignUp