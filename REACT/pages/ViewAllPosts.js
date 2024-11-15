import React, { useEffect, useState } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
//import GetPosts from './getPosts';
const ViewAllPosts = () => {
    
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
            <div>       
                <ul>
                {data.map(post => (
                  <li key={post._id}>

                    <Link to={`/post/${post._id}`} >{post.title}</Link>
                  
                  
                  </li>
                ))}
              </ul> 
            </div>
          );
    }




    return (
        <div>
            <h1>Here are all of the posts</h1>
            {GetPosts()}

        </div>
    );
};

export default ViewAllPosts;
