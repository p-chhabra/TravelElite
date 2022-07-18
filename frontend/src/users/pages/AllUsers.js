import React, {useState, useEffect} from "react";
import AnimatedPage from "../../shared/components/AnimatedPage";
import SearchBar from "../components/SearchBar";
import VisitUser from "../components/VisitUser";
import DUMMY_USERS from '../data/DUMMY_USERS.json'
import ErrorModal from "../../shared/components/ErrorModal";
import LoadingSpinner from "../../shared/components/LoadingSpinner";

const AllUsers = () => {

  //STATES
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  //Fetching Users
  useEffect(()=>{
    const getRequest = async () => {
      try{
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/users');
        const responseData = await response.json();
        if(!response.ok){
          throw new Error(responseData.message);
        }
        setUsers(responseData.users);
      } catch(err){
        console.log(err.message);
        setError(err.message);
      }
      setIsLoading(false);
    }

    getRequest();
  },[])

  const [searchTerm, setSearchTerm] = useState("");

  const allUsers = users.filter((user)=>{
    if(searchTerm === ""){
      return user;
    } else if(user.name.toLowerCase().includes(searchTerm.toLowerCase())){
      return user;
    } 
  }).map((user) => {
    return (
      <VisitUser key={user.id} name={user.name} places={user.places.length} rating={user.rating} src={user.image} id={user.id}/>
    );
  });

  const errorHandler = () =>{
    setError(null);
  }
  
  return (
    <AnimatedPage>
      {<ErrorModal error={error} onClear={errorHandler}/>}
      {isLoading && <LoadingSpinner/>}
      <div className="flex items-center justify-center text-gray-300 text-3xl pb-4">
        <h1>Search User</h1>
      </div>
      <SearchBar setTerm = {setSearchTerm}/>
      {!isLoading && users && allUsers}
    </AnimatedPage>
  );
};

export default AllUsers;
