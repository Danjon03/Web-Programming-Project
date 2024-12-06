import React, { useEffect, useState } from 'react';
import  {Link}  from 'react-router-dom';
import './CSS/posts.css';
import Navbar from './Navbar';
//import GetPosts from './getPosts';
const ViewAllPosts = () => {
    

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


  function renderCreatePost()
  {
    if(getCookie("isOwner") === "True")
    {
        return(
             <Link class="link" to="/createPost">Create Post </Link>
        );
    }
  }




    //Function to get all posts from API Server and return them as a list of links that direct to the individual post
    function GetPosts()
    {
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await fetch('http://localhost:3000/api/getAllPosts');
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const jsonData = await response.json();
              //console.log(jsonData);
              setData(jsonData);
            } catch (error) {
              setError(error.message);
            } finally {
              setLoading(false);
            }
          };
      
          fetchData();
        }, []);
      
        if (loading) {
          return <div>Loading...</div>;
        }
      
        if (error) {
          return <div>Error: {error}</div>;
        }
        
        
        return (




            <div class="main-box" >       
                <ul>
                {data.map(post => (
                  
                  <div class="each-post">
                    <li key={post._id}><Link to={`/post/${post._id}`}>{post.title}</Link></li>
                  </div>
                ))}
              </ul> 
            </div>
          );
    }




    return (





      <div class="parent">

          <div></div>
          <div class="middle">

            <Link class="link" to="/posts">All Posts</Link>
            {renderCreatePost()}
            <Link class="link" to="/">Logout</Link>


              <h1 class="label">All Posts</h1>
              {GetPosts()}
          </div>
          <div></div>
      

      </div>
    );
};

export default ViewAllPosts;
