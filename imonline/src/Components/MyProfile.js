import React from 'react';
import styled from "styled-components";
import { useHistory } from 'react-router-dom';
const StyledDiv = styled.div`
text-align:center;
color:black;`

const MyProfile = () => {
    const {push} = useHistory()
    const toInfo = () => {
        push("/updateinformation")
    }
    const toProfile = () => {
        push("/updateprofile")
    }
    return (
        <StyledDiv>
            <h3>
                Which would you like to update?
            </h3>
            <div className='information'>
            <h4>
                User Information?
            </h4>
            <button onClick={toInfo}>Update</button>
            </div>

            <div className='profile'>
            <h4>
                User Profile?
            </h4>
            <button onClick={toProfile}>Update</button>
            </div>
       
        </StyledDiv>
    )
}
export default MyProfile;
