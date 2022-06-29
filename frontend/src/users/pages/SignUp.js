import React, {useState, useRef} from 'react'
import AnimatedPage from '../../shared/components/AnimatedPage'
import './SignUp.css'

const emailValidation = value => value.includes('@') && value.length >= 5;
const userNameValidation = value => !value.includes(" ") && value.length >= 4;
const passwordValidation = value => !value.includes(" ") && value.length >= 5;

const SignUp = () => {

  const form = document.getElementById('SignUpForm');

  const [formValidity, setFormValidity] = useState({
    email: true,
    username: true,
    password: true
  })

  const emailInputRef = useRef();
  const userNameInputRef = useRef();
  const passwordInputRef = useRef();

  const formValidityHandler = (e) => {

    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
  const enteredUserName = userNameInputRef.current.value;
  const enteredPassword = passwordInputRef.current.value;

  const emailIsValid = emailValidation(enteredEmail);
  const userNameIsValid = userNameValidation(enteredUserName);
  const passwordIsValid = passwordValidation(enteredPassword);

  setFormValidity({
    email: emailIsValid,
    username: userNameIsValid,
    password: passwordIsValid
  })

  const formIsValid = emailIsValid && userNameIsValid && passwordIsValid;

  if(!formIsValid) return;
  form.reset();
  }


  return (
    <AnimatedPage>
    <div className='flex items-center justify-center mt-20'>
    <div className="signupSection">
  <div className="info">
    <h2>Mission to Connect Travellers</h2>
    <i className="icon ion-ios-ionic-outline" aria-hidden="true"></i>
    <p>YourPlaces</p>
  </div>
  <form action="#" method="POST" id='SignUpForm' className="signupForm" name="signupform">
    <p className='text-2xl'>Sign Up</p>
    <ul className="noBullet">
      <li>
        <label htmlFor="username"></label>
        <input ref={userNameInputRef} type="text" className={formValidity.username ? `inputFields` : `inputFieldInvalid`} id="username" name="username" placeholder="Username" autoComplete='off'  required/>
        {!formValidity.username && <p className='text-red-500'>Username should be atleast 4 characters long</p>}
      </li>
      <li>
        <label htmlFor="email"></label>
        <input ref={emailInputRef} type="email" className={formValidity.email ? `inputFields` : `inputFieldInvalid`} id="email" name="email" placeholder="Email" autoComplete='off' required/>
        {!formValidity.email && <p className='text-red-500'>Please enter a valid email</p>}
      </li>
      <li>
        <label htmlFor="password"></label>
        <input ref={passwordInputRef} type="password" className={formValidity.password ? `inputFields` : `inputFieldInvalid`} id="password" name="password" placeholder="Password" required/>
        {!formValidity.password && <p className='text-red-500'>Password should be atleast 4 characters long</p>}
      </li>
      <h1 className='pt-10'>Profile Picture (Optional)</h1>
      <li>
        <input type="file" className='inputFields inputImageField' name="profile-pic" accept='image/png, image/jpeg, image/jpg'/>
      </li>
      <li id="center-btn">
        <input onClick={formValidityHandler} type="submit" id="join-btn" name="join" alt="Join" value="Join"></input>
      </li>
    </ul>
  </form>
</div>
</div>
</AnimatedPage>
  )
}

export default SignUp