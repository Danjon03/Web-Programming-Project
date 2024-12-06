import React from 'react';
import './CSS/createPost.css';
import  {Link}  from 'react-router-dom';
const CreateAccount = () => {

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




    async function createPost(formData) {
      

        const url = 'http://localhost:3000/api/createPost'
        const data = {
            "title": formData.get("title"),
            "body": formData.get("body"),
            "uploadUserId": "0"
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
      }
    return (
        <div class="middle">
            <Link class="link" to="/posts">All Posts</Link>
            {renderCreatePost()}
            <Link class="link" to="/">Logout</Link>


            <h1>Do The Following to create your post</h1>
                    <form action={createPost}>
                      <input name="title" placeholder="Post Title" />
                      <br></br>
                      <textarea class="content" name="body"/>
                      <br></br>
                      <button type="submit" >Create Post</button>
                    </form>
        </div>
    );


};
export default CreateAccount;
