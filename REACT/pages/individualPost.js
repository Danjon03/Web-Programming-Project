import React, { useEffect, useState } from 'react';
import  {Link}  from 'react-router-dom';
import './CSS/individualposts.css';
import { useParams } from 'react-router-dom';

const IndividualPost = () => {

    const { id } = useParams();

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



    function CreateComment(formData)
    {
      const url = 'http://localhost:3000/api/createComment'
        const data = {
            "PostedUser": getCookie("loggedInUser"),
            "comment": formData.get("comment"),
            "PostDate": new Date(),
            "PostID": id
        };
        const customHeaders = {
            "Content-Type": "application/json",
        }
        
        fetch(url, {
            method: "POST",
            headers: customHeaders,
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });

            window.location.reload();
    }

    function GetComments()
    {
      const [data, setData] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await fetch('http://localhost:3000/api/getAllComments');
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const jsonData = await response.json();
              console.log(jsonData);
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
        
        <div >
                        
          <ul>
          {data.map(comment => (
            comment.PostID === id &&
            <div>
            <li class="comment" key={comment._id}>{comment.PostedUser}: {comment.comment}</li>
            </div>
          ))}
        </ul> 
      </div>);
      }





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
              <div class="three-columns-grid">
                
                <div></div>
                <div class="middle">

                <Link class="link" to="/posts">All Posts</Link>
                {renderCreatePost()}
                <Link class="link" to="/">Logout</Link>


                <ul>
                {data.map(post => (
                  post._id === id &&
                  <div>
                    <h1 key={post._id}>{post.title} </h1>
                    <br></br>
                    <p class="post-body">{post.body}</p>
                  
                    <br></br>
                  
                  


                  Write Comment:
                  <form action={CreateComment}>
                        <input name="comment" placeholder="Type your comment" />
                        <button type="submit" >Post Comment</button>
                      </form>


                      <GetComments></GetComments>
                  </div>
                ))}
              </ul> 
            </div>

            <div></div>

          </div>
        );  
    }

    return ( GetPosts());
  
};

export default IndividualPost;
