import React, {useState, useRef, useContext} from 'react'
import AnimatedPage from '../../shared/components/AnimatedPage'
import './SignUp.css'
import { AuthContext } from '../../shared/context/auth-context';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../../shared/components/ErrorModal'
import LoadingSpinner from '../../shared/components/LoadingSpinner'

const emailValidation = value => value.includes('@') && value.length >= 5;
const userNameValidation = value => value.length >= 4;
const passwordValidation = value => !value.includes(" ") && value.length >= 5;

const SignUp = () => {

  ///AuthContext
  const auth = useContext(AuthContext);

  //States
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
  const privacyInputRef = useRef();
  const imageInputRef = useRef();


  const onSumbitHandler = async (e) => {

    e.preventDefault();

    //ISPRIVATE HANDLER
  const isPrivate = () => {
    console.log(privacyInputRef.current.value)
    if(privacyInputRef.current.value === "Public") return false;
    else return true;
  }

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
        setIsLoading(true);
        console.log(imageInputRef.current.value)
        const formData = new FormData();
        formData.append('name', userNameInputRef.current.value);
        formData.append('email', emailInputRef.current.value);
        formData.append('password', passwordInputRef.current.value);
        formData.append('isPrivate', isPrivate())
        formData.append('image', imageInputRef.current.value);
        const response = await fetch('http://localhost:5000/api/users/signup',{
          method: 'POST',
          body:formData
        })
  
        const responseData = await response.json();
        console.log(responseData);
        if(!response.ok){
          throw new Error(responseData.message);
        }

        //Page Change
        auth.login(responseData.createdUser.id);
        auth.setUser(enteredUserName);
        form.reset();
        Navigate(`/${responseData.createdUser.id}`);
      } catch(err){
        setIsLoading(false);
        setError(err.message);
        console.log(err.message);
      }
    }

    setIsLoading(false);
  }
  }

  const errorHandler = () => {
    setError(null);
  }

  return (
    <AnimatedPage>
      <ErrorModal error={error} onClear={errorHandler}/>
      {isLoading && <LoadingSpinner asOverlay/>}
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
      <li className='pt-5'>
        <h2 htmlFor='profile-type'>Select Privacy</h2>
        <select ref={privacyInputRef} className='inputFields' name="" id="">
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>
      </li>
      <h1 className='pt-5'>Profile Picture (Optional)</h1>
      <li>
        <input ref={imageInputRef} type="file" className='inputFields inputImageField' name="image" accept='image/png, image/jpeg, image/jpg'/>
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