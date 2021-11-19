
import React, { useState, useEffect } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import "./tables.css"

const SubmissionsList = (props) => {
  const [submissionsList, setSubmissionsList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const getSubmissionsList = async () => {
      try {
        const { data } = await axios.get(`/api/viewSubmissions/${props.assignmentId}`);
        setErrorMsg('');
        setSubmissionsList(data);
    
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };
    getSubmissionsList();
  }, []);

  const downloadFile = async (regCode,assiCode, path, mimetype) => {
    try {
      const result = await axios.get(`/api/download/${assiCode}/${regCode}`, {
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

  return (
    <div className="files-container">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <table id="assignments">
        <thead>
          <tr>
            <th>Registration No.</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {submissionsList.length > 0 ? (
            submissionsList.map(
              ({ _id, regCode, file_path, file_mimetype }) => (
                <tr key={_id}>
                  <td className="file-title">{regCode}</td>
                  <td>
                   
                    <button onClick={() =>
                        downloadFile(regCode,props.assignmentId,file_path, file_mimetype)
                      }>
                      Download
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
};

export default SubmissionsList;
