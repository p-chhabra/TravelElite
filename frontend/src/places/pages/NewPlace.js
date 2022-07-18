import React, {useState, useEffect, useContext, useRef} from 'react'
import { AuthContext } from '../../shared/context/auth-context'

const NewPlace = () => {
    //Global Context
    const auth = useContext(AuthContext);

    //STATES
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    //INPUT VALIDATION
    const titleInputRef = useRef();
    const descriptionInputRef = useRef();
    const subTitleInputRef = useRef();
    const addressInputRef = useRef();

    const [inputValidity, setInputValidty] = useState({
        titleInput: true,
        descriptionInput: true,
        addressInputRef: true
    })

  return (
    <div></div>
  )
}

export default NewPlace