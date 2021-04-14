import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledDiv = styled.nav`

background-color:black;
padding:3%;
display:flex;
justify-content:space-evenly;

a{
    text-decoration:none;
    color:white;
    font-size:1.1rem;
}

`

const Nav = () => {
    return (
       <header>
           <StyledDiv>
               <Link to='/home'>Home</Link>
               <Link to='/createpost'>Create Post</Link>
               <Link to='myprofile'>My Profile</Link>
               <Link>Logout</Link>
           </StyledDiv>
       </header>
    )
}
export default Nav;