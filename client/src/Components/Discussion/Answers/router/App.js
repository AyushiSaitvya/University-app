import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap';
import  AlertDismissibleExample from './questionDialog';

const App = (props) => {
  const [show,setShow]=useState(false);  
  const [state, setState] = useState({
    questionId:props.questionId,
    answer:''
  });
  const [errorMsg, setErrorMsg] = useState('');
  // const { data } = await axios.get(`/api/getAnswer/${props.questionId}`);
  // console.log(data);

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };


  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const {questionId,answer } = state;
      console.log(state)
      if (questionId.trim() !== ''&&answer.trim()!='') {
          setErrorMsg('');
          await axios.post('/api/postAnswer',state);
          setState({answer:''});
          setShow(true);
        
      } else {
        setErrorMsg('Please enter all the field values.');
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  if(!show)
  {
  return (
    <React.Fragment>
      <Form className="search-form" onSubmit={handleOnSubmit}>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <Row>
          <Col>
            <Form.Group controlId="answer">
              <Form.Control as="textarea" rows={5}
                type="text"
                name="answer"
                value={state.answer || ''}
                placeholder="Enter answer"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      
    </React.Fragment>

  
  );
          }
          else
          {
                   return(
                     <React.Fragment>
                     <AlertDismissibleExample setShow={setShow} show={show} />
                     </React.Fragment>
                   )

          }
};

export default App;
