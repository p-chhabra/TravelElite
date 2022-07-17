import React, {useState, useRef, useContext} from 'react'
import AnimatedPage from '../../shared/components/AnimatedPage'
import './SignUp.css'
import { AuthContext } from '../../shared/context/auth-context';
import { useNavigate } from 'react-router-dom';

const emailValidation = value => value.includes('@') && value.length >= 5;
const userNameValidation = value => !value.includes(" ") && value.length >= 4;
const passwordValidation = value => !value.includes(" ") && value.length >= 5;

const SignUp = () => {

  ///AuthContext
  const auth = useContext(AuthContext);
  //Username Handler
  const [username, setUsername] = useState('');
  const onUsernameInput = (e) => {
    setUsername(e.target.value);
  }

  //Navigation
  const Navigate = useNavigate();

  const form = document.getElementById('SignUpForm');

  ///Checking Form Input Validity
  const [formValidity, setFormValidity] = useState({
    email: true,
    username: true,
    password: true
  })

  const emailInputRef = useRef();
  const userNameInputRef = useRef();
  const passwordInputRef = useRef();

  const onSumbitHandler = async (e) => {

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

  //If Form inputs are invalid
  if(!formIsValid) return;

  ///Login State // If Form inputs are valid
  if(formIsValid){

    if(auth.isLoggedIn){

    } else{
      try{
        const response = await fetch('http://localhost:5000/api/users/signup',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: userNameInputRef.current.value,
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value
          })
        })
  
        const responseData = await response.json();
        console.log(responseData);
      } catch(err){
        console.log(err.message);
        console.log('ABC');
      }
    }

    auth.login();
    auth.setUser(enteredUserName);
    form.reset();
    Navigate(`/${username}`);
  }
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
        <input ref={userNameInputRef} type="text" className={formValidity.username ? `inputFields` : `inputFieldInvalid`} id="username" name="username" placeholder="Username" autoComplete='off' onChange={onUsernameInput} required/>
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
        <input onClick={onSumbitHandler} type="submit" id="join-btn" name="join" alt="Join" value="Join"></input>
      </li>
    </ul>
  </form>
</div>
</div>
</AnimatedPage>
  )
}

export default SignUp