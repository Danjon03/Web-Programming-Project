import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import ViewAllPosts from './pages/ViewAllPosts'; 
import CreatePost from './pages/createPost';
import IndividualPost from './pages/individualPost';
import './App.css';
// npm install react-router-dom
const App = () => {
    return (


        //This is what displays the different links at the top of the page
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Login</Link>
                    </li>
                    <li>
                        <Link to="/createAccount">Create Account</Link>
                    </li>
                    <li>
                        <Link to="/posts">Posts</Link>
                    </li>
                    <li>
                        <Link to="/createPost">Create Post</Link>
                    </li>


                </ul>
            </nav>


            {/* This is how the links know what page to open when clicked on */}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/createAccount" element={<CreateAccount />} />
                <Route path="/posts" element={<ViewAllPosts/>}></Route>
                <Route path="/createPost" element={<CreatePost/>}></Route>
                <Route path="/post/:id" element={<IndividualPost/>} />
            </Routes>
        </Router>
    );
};

export default App;
