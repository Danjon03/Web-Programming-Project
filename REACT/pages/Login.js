import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
const Login = () => {
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await fetch('http://localhost:3000/api/getUsers');
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
        
        function ValidateLogin(formData)
        {
            function validate(x)
            {
              if(x.username === formData.get("username") && x.password === formData.get("password"))
              {
                document.cookie = "loggedInUser=" + formData.get("username") + "; path=/";
                document.cookie = "isOwner=" + x.isOwner + "; path=/";
                window.location.href = '/posts';
              }
            }

            data.map(validate);

        return("Hello World!");

    }

    return (
        <div>
            <h1>Enter your Username and Password to Log in!</h1>
            
            <form action={ValidateLogin}>
                <input name="username" placeholder="username" />
      
                <br></br>

                <input name="password" placeholder = "password" type="password"/>
                <button type="submit" >Login</button>
            </form>
            <Link to="/createAccount" >Create Account</Link>


        </div>
    );

};

export default Login;
            
