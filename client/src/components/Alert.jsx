import React, {useState} from 'react'
import "./styles/alert.css"
import { FaTimes } from 'react-icons/fa';

export default function (text) {

    const [display, setDisplay] = useState(true);

    const handleClose = () => {
        setDisplay(false);
    }

    return (display ? <div className={text.class}><p>{text.text}</p><div onClick={handleClose} className='close'><FaTimes/></div></div> : " ")
  
}
