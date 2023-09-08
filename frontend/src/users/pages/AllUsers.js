import React, { useState, useEffect } from "react";
import AnimatedPage from "../../shared/components/AnimatedPage";
import SearchBar from "../components/SearchBar";
import VisitUser from "../components/VisitUser";
import ErrorModal from "../../shared/components/ErrorModal";
import LoadingSpinner from "../../shared/components/LoadingSpinner";

const AllUsers = () => {
  //STATES
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  //Fetching Users
  useEffect(() => {
    const getRequest = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL + "/users"
        );
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setUsers(responseData.users);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      }
      setIsLoading(false);
    };

    getRequest();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const allUsers = users
    .filter((user) => {
      if (searchTerm === "") {
        return user;
      } else if (user.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return user;
      }
    })
    .map((user) => {
      return (
        <VisitUser
          key={user.id}
          name={user.name}
          places={user.places.length}
          rating={user.rating}
          image={user.image}
          id={user.id}
          isPrivate={user.isPrivate}
        />
      );
    });

  const errorHandler = () => {
    setError(null);
  };

  return (
    <AnimatedPage>
      {
        <ErrorModal
          header={"No Places Found"}
          error={error}
          onClear={errorHandler}
        />
      }
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div className="flex items-center justify-center text-gray-300 text-3xl pb-4">
          <h1>Search User</h1>
        </div>
      )}
      {!isLoading && <SearchBar setTerm={setSearchTerm} />}
      {!isLoading && users && allUsers}
    </AnimatedPage>
  );
};

export default AllUsers;
