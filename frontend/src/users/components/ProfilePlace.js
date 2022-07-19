import React,{useState} from 'react'
import Modal from '../../shared/components/Modal'
import Map from '../../places/components/Map';
import './ProfilePlace.css'
import { Link } from 'react-router-dom';

const ProfilePlace = (props) => {

    //PLACE COORDINATES
    const {lat, lng} = props.coordinates;

    //MAP FUNCTIONS
  const [showMap, setShowMap] = useState(false);
  const showMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const [showModal, setShowModal] = useState(false);

  const Button = ()=>{
    return <button onClick={closeMapHandler} className="p-5 bg-green-300 text-white">Close</button>
  }
  
  const showModalHandler = () => {
    setShowModal(true);
  }

  const cancelModalHandler = () => {
    setShowModal(false);
  }

  return (
    <React.Fragment>
    <Modal
        show={showMap}
        header={props.address}
        onCancel={closeMapHandler}
        contentClass="Place-item__modal-content "
        footerClass="Place-item__modal-actions "
        footer={<Button/>}
      >
        <div className="Map-container">
          <Map center={[lat,lng]} zoom={16}/>
        </div>
      </Modal>
      <Modal show={showModal} onCancel={cancelModalHandler} header={'Are you sure?'} footer={
        <React.Fragment>
          <button onClick={showModalHandler}>Cancel</button>
          <button onClick={cancelModalHandler}>Delete</button>
        </React.Fragment>
      }>

      </Modal>
      <div className="Card-Container">
        <h1>{props.title}</h1>
        <img
          src="https://images.pexels.com/photos/1680140/pexels-photo-1680140.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          alt="IMG"
        />
        <figcaption>
          <h2>Details</h2>
          <p>{props.description}</p>
          <div className='flex flex-row justify-between items-center'>
          <button className='view--button' onClick={showMapHandler}>View on Map</button>
          <button className='edit--button' onClick={''}>Edit Place</button>
          <button className='delete--button' onClick={showModalHandler}>Delete Place</button>
          </div>
        </figcaption>
      </div>
      </React.Fragment>
  )
}

export default ProfilePlace