import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { notify } from 'react-notify-toast'
import Spinner from './Spinner'
import { useParams } from 'react-router-dom';

export default function Confirm () {

 
  const [confirming,setConfirming]=useState(true)
  const { id } =useParams();
  console.log(id);

  useEffect(() => {

    fetch(`/api/email/confirm/${id}`)
      .then(res => res.json())
      .then(data => {
        setConfirming(false)
        notify.show(data.msg)
      })
      .catch(err => console.log(err))
   
  }, []);
  


    return(<div className='confirm'>
      {confirming
        ? <Spinner size='8x' spinning={'spinning'} /> 
        : <Link to='/'>
            <Spinner size='8x' spinning={''} /> 
          </Link>
      }
      
    </div>)
  
}