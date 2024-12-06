import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// npm install react-router-dom


function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }


  const Navbar = () =>
  {
    if(getCookie("isOwner") === "True")
    {
        return(            
          // <Link to="/createPost">Create Post </Link>
          <p>Hello World</p>
        );
    }
  }


export default Navbar();


