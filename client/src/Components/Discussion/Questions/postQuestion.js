
import React from 'react';
import AppRouter from './router/AppRouter';
import '../../entry.css'
import {Button} from "react-bootstrap";

export default function postQuestion(props){
  return(
    <div>
       <Button onClick={()=>props.setPostQuestion(false)}>Go back</Button>
    <div className="outer">
    <div className="inner">
    
    <AppRouter profId={props.profId}/>
    </div>
    </div>
    </div>
  )
}