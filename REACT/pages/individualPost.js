import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

const IndividualPost = () => {

    const { id } = useParams();

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
                post._id === id &&
                <div>
                <li key={post._id}>{post.title}</li>
                <li>{post.body}</li>
                
                </div>
              ))}
            </ul> 
          </div>
        );  
    }
    return ( GetPosts());
};

export default IndividualPost;
