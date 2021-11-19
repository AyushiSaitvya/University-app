import React from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css'

export default function dashboard()
{
    return(

       <div class="row">
       <div class="block">
    <div class="circle" >
      <center><a href="/assignments">Upload/Download</a></center>  
    </div>
    </div>

    <div class="block">
    <div class="circle" >
      <center><a href="/discussions">Discussion</a></center>  
    </div>
    </div>
  </div>

    )
}