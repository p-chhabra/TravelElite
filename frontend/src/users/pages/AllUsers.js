import React, {useState} from "react";
import AnimatedPage from "../../shared/components/AnimatedPage";
import SearchBar from "../components/SearchBar";
import VisitUser from "../components/VisitUser";
import DUMMY_USERS from '../data/DUMMY_USERS.json'

const AllUsers = () => {

  const [searchTerm, setSearchTerm] = useState("");

  const allUsers = DUMMY_USERS.filter((user)=>{
    if(searchTerm === ""){
      return user;
    } else if(user.name.toLowerCase().includes(searchTerm.toLowerCase())){
      return user;
    } 
  }).map((user) => {
    return (
      <VisitUser key={user.id} name={user.name} places={user.places} rating={user.rating} src={user.profile} id={user.id}/>
    );
  });
  
  return (
    <AnimatedPage>
      <div className="flex items-center justify-center text-gray-300 text-3xl pb-4">
        <h1>Search User</h1>
      </div>
      <SearchBar setTerm = {setSearchTerm}/>
      {allUsers}
    </AnimatedPage>
  );
};

export default AllUsers;
