import React,{useState} from 'react'
import Modal from '../../shared/components/Modal'
import Map from '../../places/components/Map';
import './ProfilePlace.css'
import { Link } from 'react-router-dom';
import Button from '../../shared/components/Button';
import EditForm from './EditForm';

const ProfilePlace = (props) => {

    //PLACE COORDINATES
    const {lat, lng} = props.coordinates;

    //MAP FUNCTIONS
  const [showMap, setShowMap] = useState(false);
  const showMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  //MODAL STATES
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  
  //DELETE MODAL UTILS
  const showModalHandler = () => {
    setShowModal(true);
  }

  const cancelModalHandler = () => {
    setShowModal(false);
  }

  const onDeleteHandler = async () => {
    setShowModal(false);
    try{
      const response = await fetch(`http://localhost:5000/api/places/${props.id}`,{
        method: 'DELETE'
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch(err){
      console.log(err.message);
    }
  }

  //EDIT MODAL UTILS
  const showEditHandler = () => {
    setShowEdit(true);
  }

  const closeEditHandler = () => {
    setShowEdit(false);
  }

  console.log(props.placeImage)

  return (
    <React.Fragment>
    {/* MAP MODAL */}
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

      {/* DELETE PLACE MODAL */}
      <Modal show={showModal} onCancel={cancelModalHandler} header={'Are you sure?'} footer={
        <React.Fragment>
          <div className='flex justify-end space-x-8 items-center footer'>
          <a className='bg-green-300 p-3 border-solid border-2 rounded-md border-black hover:cursor-pointer' onClick={cancelModalHandler}>Cancel</a>
          <a className='bg-red-400 p-3 hover:cursor-pointer border-black border-solid border-2 rounded-md' onClick={onDeleteHandler}>Delete</a>
          </div>
        </React.Fragment>
      }>
        <p>This place will be permanently deleted and cannot be recovered</p>
      </Modal>

      {/* EDIT PLACE MODAL */}
      <Modal className='modalClass' show={showEdit} onCancel={closeEditHandler} header={'EDIT'}>
        <EditForm closeEdit = {closeEditHandler} placeID={props.id}/>
      </Modal>
      <div className="Card-Container">
        <h1>{props.title}</h1>
        <img
          src={`http://localhost:5000/public/${props.placeImage}`}
          alt="IMG"
        />
        <figcaption>
          <h2>{props.subTitle}</h2>
          <p>{props.description}</p>
          <div className='flex flex-row justify-between items-center'>
          <button className='view--button' onClick={showMapHandler}>View on Map</button>
          <button className='edit--button' onClick={showEditHandler}>Edit Place</button>
          <button className='delete--button' onClick={showModalHandler}>Delete Place</button>
          </div>
        </figcaption>
      </div>
      </React.Fragment>
  )
}

export default ProfilePlace