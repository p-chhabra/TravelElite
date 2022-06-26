import React from "react";
import "./SearchBar.css";

const SearchBar = (props) => {

    const onSubmitHandler = (e)=>{
        e.preventDefault();
    }


  return (
    <div className="form-req wrapper">
      <form onSubmit={onSubmitHandler} role="search">
        <label htmlFor="search">Search for stuff</label>
        <input
          id="search"
          type="search"
          onChange={(event)=>{props.setTerm(event.target.value)}}
          placeholder="Search..."
          autoFocus
          required
        />
        <button type="button">Go</button>
      </form>
    </div>
  );
};

export default SearchBar;
