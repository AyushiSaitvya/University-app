import React, { useState, useEffect } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import "./tables.css"
// import { API_URL } from '../utils/constants';

const FilesList = () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`/api/getAllFiles`);
        setErrorMsg('');
        
        setFilesList(data);
        console.log(filesList);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };
    getFilesList();
  }, []);

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`/api/download/${id}`, {
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
            <th>Title</th>
            <th>Description</th>
            <th>Download File</th>
          </tr>
        </thead>
        <tbody>
          {filesList.length > 0 ? (
            filesList.map(
              ({ _id, title, description, file_path, file_mimetype }) => (
                <tr key={_id}>
                  <td className="file-title">{title}</td>
                  <td className="file-description">{description}</td>
                  <td>
                   
                    <button onClick={() =>
                        downloadFile(_id, file_path, file_mimetype)
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

export default FilesList;
