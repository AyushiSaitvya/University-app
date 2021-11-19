import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap';
import  AlertDismissibleExample from './addDialog';

const App = (props) => {
  const [show,setShow]=useState(false);
  
  const [state, setState] = useState({
    name: '',
    department: '',
    email:''
  });
  const [errorMsg, setErrorMsg] = useState('');
  

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };


  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const { name, department,email } = state;
      if (name.trim() !== '' && (department.trim() !== ''&&email.trim()!='')) {
          setErrorMsg('');
          await axios.post('/api/addProfessor',state);
          setState({name:'',department:'',email:''});
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
            <Form.Group controlId="name">
              <Form.Control
                type="text"
                name="name"
                value={state.name || ''}
                placeholder="Enter name"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="department">
              <Form.Control
                type="text"
                name="department"
                value={state.department || ''}
                placeholder="Enter department"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="email">
              <Form.Control
                type="text"
                name="email"
                value={state.email || ''}
                placeholder="Enter email"
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
