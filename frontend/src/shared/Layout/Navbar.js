import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import {FaBars} from 'react-icons/fa'

///Navbar Component
const Navbar = () => {

    const [nav, setNav]  = useState(false);

    const handleClick = () => {
        setNav(!nav);
    }

  return (
    <nav className='w-full flex justify-between items-center px-4 font-bold bg-[#0b0c10]'>
        <h1 className='text-[#66fcf1] text-3xl'>YourPlaces</h1>
        <ul className='flex flex-row text-[#c5c6c7] p-5 items-center'>
            <li className='px-6 hover:text-[#66fcf1] duration-500 text-sm'>
                <NavLink to="/">Home</NavLink>
            </li>
            <li className='px-6 hover:text-[#66fcf1] duration-500 text-sm'>
                <NavLink to="/users">All Users</NavLink>
            </li>
            <li className='px-6 hover:text-[#66fcf1] duration-500 text-sm'>
                <NavLink to="/places">SignIn</NavLink>
            </li>
            <li className='px-6 border-2 rounded-md border-[#66fcf1] p-2 hover:text-[#66fcf1] duration-500 text-sm'>
                <NavLink to="/places">SignUp</NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar