import React, {useState, useContext} from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import {FaBars} from 'react-icons/fa'
import { AuthContext } from '../context/auth-context'

///Navbar Component
const Navbar = () => {

    //AUTH CONTEXT
    const auth = useContext(AuthContext);

    const [nav, setNav]  = useState(false);

    //Function to open and close navbar when in mobile view
    const handleClick = () => {
        setNav(!nav);
    }
    const handleSignOut = () => {
        auth.logout();
    }

  return (
      ///Wide Device Navbar
    <nav className='w-full flex justify-between items-center px-4 font-bold bg-[#21272c]'>
        <h1 className='text-gray-300 text-3xl'>YourPlaces</h1>
        <ul className='flex flex-row text-gray-300 p-2 items-center space-x-6'>
            {!auth.isLoggedIn && <li className='px-4 hover-underline-animation p-1 hover:text-green-400 duration-500 text-sm'>
                <NavLink to="/">Home</NavLink>
            </li>}
            <li className='px-4 hover-underline-animation p-1 hover:text-green-400 duration-500 text-sm'>
                <NavLink to="/users">All Users</NavLink>
            </li>
            {!auth.isLoggedIn && <li className='px-4 hover-underline-animation p-1 hover:text-green-400 duration-500 text-sm'>
                <NavLink to="/signin">SignIn</NavLink>
            </li>}
            {!auth.isLoggedIn && <li className='px-4 border-2 border-green-400 rounded-md p-1 hover:text-[black] hover:bg-green-400 duration-500 text-sm my-2'>
                <NavLink to="/signup">SignUp</NavLink>
            </li>}
            {auth.isLoggedIn && <li className='px-4 hover-underline-animation p-1 hover:text-green-400 duration-500 text-sm'>
                <NavLink to={`/${auth.userID}`}>Profile</NavLink>
            </li>}
            {auth.isLoggedIn && <li className='px-4 border-2 border-green-400 rounded-md p-1 hover:text-[black] hover:bg-green-400 duration-500 text-sm my-2'>
                <NavLink onClick={handleSignOut} to="/">Sign Out</NavLink>
            </li>}
        </ul>
    </nav>
  )
}

export default Navbar