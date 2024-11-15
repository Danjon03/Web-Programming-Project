import React from 'react';

const Login = () => {
    function search(formData) {

        alert(formData.get("username") + " : " + formData.get("password"));
      }

    return (
        <div>
            <h1>Enter your Username and Password to Log in!</h1>
            

            <form action={search}>
                <input name="username" placeholder="username" />
      
                <br></br>

                <input name="password" placeholder = "password" type="password"/>
                <button type="submit" >Login</button>
            </form> 


        </div>
    );
};

export default Login;
