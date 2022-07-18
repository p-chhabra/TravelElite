import React,{useState, useEffect, useContext} from 'react'
import AnimatedPage from '../../shared/components/AnimatedPage';
import { Link ,Route, Routes, useParams} from 'react-router-dom';
import NewPlace from '../../places/pages/NewPlace';

const Profile = () => {
  //PARAMS
  const params = useParams();

  //STATES
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //FETCHING PLACES
  useEffect(()=>{
    const getRequest = async () => {
      try{
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/api/places/users/${params.profile}`);
        const responseData = await response.json();
        if(!response.ok){
          throw new Error(responseData.message);
        }
        console.log(responseData);
      } catch(err){
        console.log(err.message);
        setError(err.message);
      }
      getRequest();
    }
  },[])

  //PLACE RENDERING


  return (
    <AnimatedPage>
    <h1 className='text-gray-300 text-center text-3xl'>Your Profile</h1>
    <Routes>
      <Route path={`/:profile/addPlace`} element={NewPlace}/>
    </Routes>
    <div className='flex flex-row justify-center m-10'>
    <Link className='border-gray-300 rounded-md border-4 p-2 hover:bg-green-600 bg-green-500 text-center text-gray-300 font-bold text-2xl' to={`/${params.profile}/addPlace`}>Add Place</Link>
    </div>
    </AnimatedPage>
  )
}
export default Profile