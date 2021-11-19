import React, { useState, useEffect } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import UploadSolution from './uploadSolution'
import ViewSubmission from './viewSubmissions'
import { Button } from 'react-bootstrap';
import "./tables.css"


const AssignmentList = (props) => {
  const [assignmentList, setAssignmentList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitAssignment,setSubmitAssignment]=useState('');
  const [viewAssignment,setViewAssignment]=useState('');
  const [assignmentId,setAssignmentId]=useState(null)
   useEffect(() => {
    
    const getAssignmentList = async () => {
      try {
        const { data } = await axios.get(`/api/getAllAssignments/${props.profId}`);
        setErrorMsg('');
        setAssignmentList(data);
        console.log(assignmentList);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };
    getAssignmentList();
  }, []);

  const downloadFile = async (assiId,code, path, mimetype) => {
    try {
      const result = await axios.get(`/api/downloadAssignment/${code}/${assiId}`, {
        responseType: 'blob'
      });
      const split = path.split('/');
      const filename = split[split.length - 1];
      setErrorMsg('');
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while downloading file. Try again later');
      }
    }
  };

  if(assignmentId==null)
  {
  return (
    <div className="files-container">
    
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <table id="assignments">
        <thead>
          <tr>
            <th>Course</th>
            <th>Branch</th>
            <th>Year</th>
            <th>Title</th>
            <th>See</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {assignmentList.length > 0 ? (
            assignmentList.map(
              ({ _id, title, year,course, branch,file_path,file_mimetype }) => (
                <tr key={_id}>
                  <td className="file-title">{title}</td>
                  <td className="file-description">{year}</td>
                  <td className="file-description">{course}</td>
                  <td className="file-description">{branch}</td>
                  <td>
                   
                    <button onClick={() =>
                       {
                            setViewAssignment(true)
                            setAssignmentId(_id)
                       }
                      }>
                      View Submissions
                    </button>
                    <button onClick={() =>
                       {
                            setSubmitAssignment(true)
                            setAssignmentId(_id)
                       }
                      }>
                       Submit Assignment
                    </button>
                  </td>
                  <td>
                  <button onClick={() =>
                         {
                            const code=year+course+branch+props.profId;
                            downloadFile(_id,code,file_path, file_mimetype);
                         }
                        
                      }>
                       Download Assignment
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
 else
 {
    if(submitAssignment)
     return(
         <UploadSolution assignmentId={assignmentId}/>
     )
     else
     return(
        <ViewSubmission assignmentId={assignmentId}/>
  )
        
 }
};
export default AssignmentList;
