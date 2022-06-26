import React, {useState} from "react";
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
      <VisitUser key={Math.random()*100} name={user.name} places={user.places} rating={user.rating} src={user.profile} />
    );
  });
  
  return (
    <React.Fragment>
      <div className="flex items-center justify-center text-gray-300 text-3xl pb-4">
        <h1>Search User</h1>
      </div>
      <SearchBar setTerm = {setSearchTerm}/>
      {allUsers}
    </React.Fragment>
  );
};

export default AllUsers;
