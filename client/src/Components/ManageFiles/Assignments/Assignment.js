import React from "react";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assignment.css'
import FilesList from './FilesList'

export default function Assignment()
{
    return(

<div>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
     
      <li class="nav-item">
        <a class="nav-link" href="/assignments/upload">Upload</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/assignments">View</a>
      </li>
      
    </ul>
  </div>
</nav>
       
       <FilesList/>
       
   
  
</div>


    )



}