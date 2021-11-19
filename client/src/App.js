import React from "react"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Confirm from './Components/Confirmation/Confirm.js'
import Login from './Components/Authentication/auth/Login'
import Register from './Components/Authentication/auth/Register'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FilesList from './Components/ManageFiles/Assignments/FilesList';
import Dashboard from './Components/dashboard'
import Assignment from './Components/ManageFiles/Assignments/Assignment'
import Upload from './Components/ManageFiles/Assignments/Upload'
import AddProfessor from './Components/Discussion/Professors/addProfessor'
import Professor from './Components/Discussion/Professors/professor'
import PostQuestion from './Components/Discussion/Questions/postQuestion'
import Notifications from 'react-notify-toast'
import jwt_decode from "jwt-decode";
import setAuthToken from "./Components/Authentication/utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./Components/Authentication/actions/authActions";

import { Provider } from "react-redux";
import store from "./Components/Authentication/stores/stores";
import PrivateRoute from "./Components/Authentication/private-route/PrivateRoute";
import Spinner from './Components/Confirmation/Spinner'


function App() {
   // Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}


  return (
    <Provider store={store}>
    
      <div>
      <div className='container fadein'>
        {/* 
          <Notifications > component from 'react-notify-toast'. This is the 
          placeholder on the dom that will hold all the feedback toast messages 
          whenever notify.show('My Message!') is called.
        */}
        <Notifications />
       
        {/* 
          For every Medium post I write I include a demo app that uses the same 
          footer. So, I have abstracted that out to use on future posts with 
          just a couple of props passed in.
        */}
      
      </div>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route exact path='/confirm/:id' element={<Confirm/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/upload-download/list" element={<FilesList/>} />
            <Route path="/assignments" element={<Assignment/>} />
            <Route path="/assignments/upload" element={<Upload/>} />
            <Route path="/discussions/addProfessor" element={<AddProfessor/>} />
            <Route path="/discussions/professors" element={<Professor/>} />
            <Route path="/discussions/postQuestion" element={<PostQuestion/>} />
            {/* <PrivateRoute exact path="/discussions/professors" element={<Professor/>}/> */}
          

          </Routes>
        </div>
     </Provider>
     
    
  );
}

export default App;
