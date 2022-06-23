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
    <nav className='w-full flex justify-between items-center px-4 font-bold bg-[white]'>
        <h1 className='text-[#dc3545] text-3xl'>YourPlaces</h1>
        <ul className='flex flex-row text-[#adb5bd] p-2 items-center space-x-6'>
            <li className='px-4 hover:border-b-2 hover:border-red-600 hover:text-[black] duration-100 text-sm'>
                <NavLink to="/">Home</NavLink>
            </li>
            <li className='px-4 hover:border-b-2 hover:border-red-600 hover:text-[black] duration-100 text-sm'>
                <NavLink to="/users">All Users</NavLink>
            </li>
            <li className='px-4 hover:border-b-2 hover:border-red-600 hover:text-[black] duration-100 text-sm'>
                <NavLink to="/places">SignIn</NavLink>
            </li>
            <li className='px-4 border-2 border-red-600 rounded-md p-1 hover:text-[black] hover:bg-red-600 duration-500 text-sm my-2'>
                <NavLink to="/places">SignUp</NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar