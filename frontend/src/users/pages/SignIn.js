import React, {useRef, useState} from 'react'
import AnimatedPage from '../../shared/components/AnimatedPage'
import "./SignIn.css"
import { Link } from 'react-router-dom'

///VALIDITY
const isFiveChars = (value) => {
  return value.trim().length === 5;
}

const emailValidation = (value) => {
  return value.includes('@') && !value.includes(" ");
} 

const SignIn = () => {

  const [formInputValidity, setFormInputValidity] = useState({
    email: true,
    password: true,
  });

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const onSubmitHandler = (e) => {

    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const eneteredEmailIsValid = emailValidation(enteredEmail);
    const eneteredPasswordIsValid = isFiveChars(enteredPassword);

    setFormInputValidity({
      email: eneteredEmailIsValid,
      password: eneteredPasswordIsValid
    })

    const formIsValid = eneteredEmailIsValid && eneteredPasswordIsValid;

    if(!formIsValid){
      return;
    }
  }

  return (
    <AnimatedPage>
    <div className='flex justify-center pt-20'>
    <div className='signinSection'>
    <form action="#" method="POST" className="signinForm" name="signinform">
    <p className='text-2xl'>Sign In</p>
    <ul className="noBullet">
      <li>
        <label htmlFor="email"></label>
        <input ref={emailInputRef} type="email" className={formInputValidity.email ? `inputFields` : `inputFieldInvalid`} id="email" name="email" placeholder="Email" autoComplete='off' required/>
        {!formInputValidity.email && <p className='text-red-500'>Please enter a valid email</p>}
      </li>
      <li>
        <label htmlFor="password"></label>
        <input ref={passwordInputRef} type="password" className={formInputValidity.password ? `inputFields` : `inputFieldInvalid`} id="password" name="password" placeholder="Password" required/>
        {!formInputValidity.password && <p className='text-red-500'>Password should be longer than 5 characters</p>}
      </li>
      <li id="center-btn">
        <input onClick={onSubmitHandler} type="submit" id="join-btn" name="join" alt="Join" value="Submit"></input>
      </li>
    </ul>
  </form>
  <p className='alert'>//Dont have an account. Visit <Link className='text-green-300 underline' to='/signup'>SignUp</Link> Page to create one//</p>
  </div>
  </div>
  </AnimatedPage>
  )
}

export default SignIn