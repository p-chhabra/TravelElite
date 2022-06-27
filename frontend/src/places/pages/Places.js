import React from 'react'
import { useParams } from 'react-router-dom'
import PlaceItem from '../components/PlaceItem'
import DUMMY_USER_PLACES from '../data/DUMMY_USER_PLACES.json'


const Places = (props) => {

  const { userID } = useParams();

  const placesList = DUMMY_USER_PLACES.map((place)=>{
    if(place.creatorID === userID){
      return <PlaceItem key={place.id} description={place.description} title={place.title} subTitle={place.subTitle} address={place.address}/> 
    } 
  });

  const filteredPlaces = placesList.filter((place)=>{
    return place !== undefined;
  })
  

  return (
    <React.Fragment>
    {filteredPlaces.length!==0 && <h1 className='text-center text-3xl text-gray-300'>Places</h1>}
    {filteredPlaces.length===0 && <h1 className='text-center text-3xl text-gray-300'>No Places Found</h1>}
    {filteredPlaces}
    </React.Fragment>
  )
}

export default Places