import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import "./tables.css"
import {useNavigate} from "react-router-dom";
import Question from '../Questions/questions';
import { connect } from "react-redux";
import { logoutUser } from "../../Authentication/actions/authActions";
import Upload from '../../ManageFiles/Assignments/Upload'
import AssignmentList from './assignmentList'
import Button from 'react-bootstrap'

const ProfessorsList = (props) => {
  const [professorsList, setProfessorsList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [professorId,setProfessorId]=useState(null);
  const [discuss,setDiscuss]=useState(false);
  const [upload,setUpload]=useState(false);
  const [viewAssignment,setViewAssignment]=useState(false);
  const [disabled,setDisabled]=useState(false)

  console.log(props.auth.user)

  const navigate=useNavigate();

  const onLogoutClick = e => {
    e.preventDefault();
    props.logoutUser();
    navigate("/login")

  };
  useEffect(() => {
    
    const getProfessorsList = async () => {
      try {
        const { data } = await axios.get(`/api/getAllProfessors`);
        setErrorMsg('');
        setProfessorsList(data);
        console.log(professorsList);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };
    getProfessorsList();
  }, []);



  if(professorId==null)
{  return (
      
    <div className="files-container">
    <button onClick={onLogoutClick}>
              Logout
      </button>
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <table id="professors">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>Discussion</th>
            <th>Assignment</th>
          </tr>
        </thead>
        <tbody>
          {professorsList.length > 0 ? (
            professorsList.map(
              ({ _id, name, department, email}) => (
                <tr key={_id}>
                  <td className="file-title">{name}</td>
                  <td className="file-description">{department}</td>
                  <td className="file-description">{email}</td>
                  <td>
                   
                    <button onClick={() =>
                        {setProfessorId(email)
                        setDiscuss(true)}
                      }>Discuss
                   </button>
                  </td>

                  <td>
                   
                    <button  onClick={() =>
                        {
                          setProfessorId(email)
                          setUpload(true)
                        }
                      }>Upload Assignment
                   </button>
                   <button onClick={() =>
                        {
                          setProfessorId(email)
                          setViewAssignment(true)
                        }
                      }>View Assignments
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
  );
          }
          else{
            if(discuss)  
            return (
                <Question profId={professorId} setProfessorId={setProfessorId}/>
            )
            else if(upload)
            {
              return (
                // <div>
                //  <Button onClick={()=>{
                //    setProfessorId(null)
                //    setUpload(false)
                //    }}>Go back</Button>
                <Upload profId={professorId} />
                // </div>
              )
            }
            else 
            {
              return (
                // <div>
                // <Button onClick={()=>{
                //   setProfessorId(null)
                //   setViewAssignment(false)
                // }}>Go back
                // </Button>
                <AssignmentList profId={professorId} />
                // </div>
              )
            }
          }
};

ProfessorsList.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { logoutUser}
)(ProfessorsList);


