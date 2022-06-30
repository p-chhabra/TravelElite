import React from 'react'
import { useParams } from 'react-router-dom'

const Profile = () => {

  const { profile } = useParams();

  return (
    <h1 className='text-gray-300 text-center text-3xl'>Your Profile</h1>
  )
}

export default Profile