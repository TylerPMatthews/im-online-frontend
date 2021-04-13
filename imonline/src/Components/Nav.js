import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledDiv = styled.nav`

background-color:white;
padding:2.5%;
display:flex;
justify-content:space-evenly;

a{
    text-decoration:none;
    color:black;
}

`

const Nav = () => {
    return (
       <header>
           <StyledDiv>
               <Link to='/home'>Home</Link>
               <Link to='/createpost'>Create Post</Link>
               <Link>My Profile</Link>
               <Link>Logout</Link>
           </StyledDiv>
       </header>
    )
}
export default Nav;