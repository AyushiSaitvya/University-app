import React, { useState, useEffect } from 'react';
import PostAnswer from '../Answers/postAnswer'
import axios from 'axios';
import "./tables.css";
import ViewAnswer from '../Answers/viewAnswer'
import { Button } from 'react-bootstrap';
// import { API_URL } from '../utils/constants';

const QuestionsList = (props) => {
  const [questionsList, setQuestionsList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [questionId,setQuestionId]=useState(null);
  const [view,setView]=useState(false);
  const [post,setPost]=useState(false);

  useEffect(() => {
    const getQuestionsList = async () => {
      try {
        const { data } = await axios.get(`/api/getAllQuestions/${props.profId}`);
        setErrorMsg('');
        
        setQuestionsList(data);
        console.log(questionsList);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };
    getQuestionsList();
  }, []);

  if(questionId==null)
  {
  return (
    <div>
       <Button onClick={()=>props.setProfessorId(null)}>Go back</Button>
    <div className="files-container">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <table id="questions">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Branch</th>
            <th>Question</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {questionsList.length > 0 ? (
            questionsList.map(
              ({ _id, name, email, branch,question }) => (
                <tr key={_id}>
                  <td className="file-title">{name}</td>
                  <td className="file-description">{email}</td>
                  <td className="file-description">{branch}</td>
                  <td className="file-description">{question}</td>
                  <td>
                   
                    <button onClick={() =>{
                          setQuestionId(_id)
                          setView(true)}
                      }>
                      View Answer
                    </button>
                    <button onClick={() =>
                          {
                            setQuestionId(_id)
                            setPost(true)
                          }
                      }>
                      Post Answer
                    </button>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={3} style={{ fontWeight: '300' }}>
                No files found. Please add some.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
          }
          else
          {
            if(view)
            {
            return (
              <div>
              <Button onClick={()=>{
                setView(false)
                setQuestionId(null)
                }}>Go back</Button>
                  <ViewAnswer questionId={questionId} />
              </div>
            )
            }
            else
            {
              return (
                <div>
                     <Button onClick={()=>{
                       setQuestionId(null)
                       
                     }}>Go back</Button>
                     <PostAnswer questionId={questionId} />
                </div>
              )

            }
            
          }
};

export default QuestionsList;
