
import React, { useState, useEffect } from 'react';
import QuestionsList from './questionsList';
import PostQuestion from './postQuestion';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

export default function questions(props){
    const [postQuestion,setPostQuestion]=useState(false);

if(!postQuestion)
{
  return(
        <div>
      
         <button onClick={() =>
                        setPostQuestion(true)
                      }>Post Question
                   </button>
        <QuestionsList profId={props.profId} setProfessorId={props.setProfessorId}/>
        </div>
   
  )}
  else
  {
       console.log(props.profId)
       console.log('ds')
       return (
<div>
           <PostQuestion profId={props.profId} setPostQuestion={setPostQuestion}/>
          </div>
       )
  }
}