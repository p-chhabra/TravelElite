import React from "react";
import "./SearchBar.css";

const SearchBar = () => {

    const onSubmitHandler = (e)=>{
        e.preventDefault();
    }

  return (
    <div className="form-req wrapper">
      <form onsubmit={onSubmitHandler} role="search">
        <label for="search">Search for stuff</label>
        <input
          id="search"
          type="search"
          placeholder="Search..."
          autofocus
          required
        />
        <button type="button">Go</button>
      </form>
    </div>
  );
};

export default SearchBar;
