import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Button} from "react-bootstrap";

const Answer = (props) => {
  const [errorMsg, setErrorMsg] = useState('');
  const [answer,setAnswer]=useState('');
 
  useEffect(() => {
    const getAnswer = async () => {
      try {
        const { data } = await axios.get(`/api/getAnswer/${props.questionId}`);
        setErrorMsg('');
        
        setAnswer(data.answer);
        console.log(data.answer);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };
    getAnswer();
  }, []);

  return (
    <div>
    
    <div className="files-container">
   
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <div>{answer}</div>
    </div>
    </div>
  );
        
};

Answer.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
 
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  {}
)(Answer);


