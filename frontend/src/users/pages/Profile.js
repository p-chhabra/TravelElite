import React,{useState, useEffect, useContext} from 'react'
import AnimatedPage from '../../shared/components/AnimatedPage';
import { Link ,useParams} from 'react-router-dom';
import './Profile.css'
import ErrorModal from '../../shared/components/ErrorModal';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import ProfilePlace from '../components/ProfilePlace';
import {AuthContext} from '../../shared/context/auth-context'

const Profile = () => {
  //PARAMS
  const params = useParams();
  
  //CONTEXT
  const auth = useContext(AuthContext);
  const userID = auth.userID;

  //STATES
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [places, setPlaces] = useState([]);

  //FETCHING PLACES
  useEffect(()=>{
    const getRequest = async () => {
      try{
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/api/places/users/${userID}`);
        const responseData = await response.json();
        if(!response.ok){
          throw new Error(responseData.message);
        }
        setPlaces(responseData.places);
        console.log(responseData);
      } catch(err){
        console.log(err.message);
        setError("You currently don't have any places, create one by by clicking Add Place");
      }
      setIsLoading(false);
    }
    getRequest();
  },[])

  //PLACE RENDERING
  const profilePlaces = places.map((place)=>{
    return <ProfilePlace key={place.id} title={place.title} subTitle={place.subTitle} description={place.description} id={place.id} creator={place.creator} address={place.address} coordinates={place.location}/>
  })

  const errorHandler = () => {
    setError(null);
  }

  return (
    <AnimatedPage>
    {isLoading && <LoadingSpinner/>}
    <ErrorModal error={error} onClear={errorHandler}/>  
    <h1 className='text-gray-300 text-center text-3xl'>Your Profile</h1>
    <div className='flex'>
    {!isLoading && profilePlaces}
    </div>
    <div className='flex flex-row justify-center m-10'>
    <Link className='border-gray-300 rounded-md border-4 p-2 hover:bg-green-600 bg-green-500 text-center text-gray-300 font-bold text-2xl' to={`/${params.profile}/addPlace`}>Add Place</Link>
    </div>
    </AnimatedPage>
  )
}
export default Profile