import React from 'react';
import styled from "styled-components";
import { useHistory } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import IconButton from '@material-ui/core/IconButton';
import UpdateRoundedIcon from '@material-ui/icons/UpdateRounded';
const StyledDiv = styled.div`
text-align:center;
.heading h3{
        font-size:1.2rem;
    }
.information{
    margin:2.5rem;
}
.information h4{
    color:red;
}
.profile h4{
    color:red;
}
.btmbottom{
    margin:3rem;
}

`

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
            <div className='heading'>
            <h3>
                Would you like to update?
            </h3>
            </div>
        
            <div className='information'>
            <h4>
                User Information
            </h4>
            <IconButton onClick={toInfo} variant='outlined'>Update <UpdateRoundedIcon/></IconButton>
            </div>

            <div className='profile'>
            <h4>
                User Profile
            </h4>
            <IconButton onClick={toProfile} variant='outlined'>Update<UpdateRoundedIcon/></IconButton>
            </div>
            <div className='btmbottom'>
            <IconButton onClick={()=>{
                push("/home")
            }}><ArrowBackRoundedIcon/></IconButton>
            </div>
            
        </StyledDiv>
    )
}
export default MyProfile;
