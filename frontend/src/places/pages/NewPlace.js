import React, {useState, useEffect, useContext, useRef} from 'react'
import { AuthContext } from '../../shared/context/auth-context'
import ErrorModal from '../../shared/components/ErrorModal';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import AnimatedPage from '../../shared/components/AnimatedPage';
import {useNavigate} from 'react-router-dom';
import './NewPlace.css'

const NewPlace = () => {
    //Global Context
    const auth = useContext(AuthContext);
    const form = document.getElementById('AddPlaceForm');

    //NAVIAGTE
    const Navigate = useNavigate();

    //STATES
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    //INPUT VALIDATION
    const titleInputRef = useRef();
    const descriptionInputRef = useRef();
    const subTitleInputRef = useRef();
    const addressInputRef = useRef();

    const [inputValidity, setInputValidty] = useState({
        titleInput: true,
        descriptionInput: true,
        addressInput: true,
        subTitleInput: true
    })

    const onSubmitHandler = async (e) => {
      e.preventDefault();
      try{
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/places',{
          method: 'POST',
          headers: {
            'COntent-Type': 'application/json'
          },
          body: JSON.stringify({
            title: titleInputRef.current.value,
            subTitle: subTitleInputRef.current.value,
            description: descriptionInputRef.current.value,
            address: addressInputRef.current.value,
            creator: auth.userID
          })
        })

        const responseData = await response.json();
        if(!response.ok){
          throw new Error(responseData.message);
        }
        Navigate(`/${auth.userID}`);
      } catch(err){
        setError(err.message);
        console.log(err);
      }
      setIsLoading(false);
    }

    const errorHandler = () => {
        setError(null);
    }

  return (
    <AnimatedPage>
    {<ErrorModal error={error} onClear={errorHandler}/>}  
    {isLoading && <LoadingSpinner/>}  
    <div className='flex justify-center pt-10'>
    <div className='addPlaceSection'>
    <form action="#" method="POST" className="addPlaceForm" id='AddPlaceForm' name="signinform">
    <p className='text-2xl'>Add place</p>
    <ul className="noBullet">
      <li>
        <label htmlFor="title"></label>
        <input ref={titleInputRef} type="text" className={inputValidity.titleInput ? `inputFields` : `inputFieldInvalid`} id="title" name="title" placeholder="Title" autoComplete='off' required/>
        {!inputValidity.titleInput && <p className='text-red-500'>Please enter a valid title</p>}
      </li>
      <li>
        <label htmlFor="title"></label>
        <input ref={subTitleInputRef} type="text" className={inputValidity.subTitleInput ? `inputFields` : `inputFieldInvalid`} id="subTitle" name="subTitle" placeholder="Subtitle" autoComplete='off' required/>
        {!inputValidity.subTitleInput && <p className='text-red-500'>Please enter a valid Subtitle</p>}
      </li>
      <li>
        <label htmlFor="address"></label>
        <input ref={addressInputRef} type="text" className={inputValidity.addressInput ? `inputFields` : `inputFieldInvalid`} id="address" name="address" placeholder="Address" autoComplete='off' required/>
        {!inputValidity.addressInput && <p className='text-red-500'>Please enter a valid address</p>}
      </li>
      <li>
        <label htmlFor="description"></label>
        <textarea ref={descriptionInputRef} type="text" className={inputValidity.descriptionInput ? `inputFields` : `inputFieldInvalid`} id="description" name="Description" placeholder="Description" required/>
        {!inputValidity.descriptionInput && <p className='text-red-500'>Description should be longer than 10 characters</p>}
      </li>
      <h1 className='pt-10'>Upload Picture</h1>
      <li>
        <input type="file" className='inputFields inputImageField' name="profile-pic" accept='image/png, image/jpeg, image/jpg'/>
      </li>
      <li id="center-btn">
        <input onClick={onSubmitHandler} type="submit" id="join-btn" name="join" alt="Join" value="Create"></input>
      </li>
    </ul>
  </form>
  <p className='alert'>//Refer to google maps for correct address. Visit <a target='_blank' className='text-green-300 underline' href='https://maps.google.com/'>Google Maps</a> </p>
  </div>
  </div>
  </AnimatedPage>
  )
}

export default NewPlace