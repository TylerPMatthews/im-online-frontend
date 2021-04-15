import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

//Styles
const StyledDiv = styled.div`
  text-align: center;
`;

//Form styles
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UpdateProfile = (props) => {
  const classes = useStyles();
  //Form values
  const initialFormValues = {
    user_profile_firstName: "",
    user_profile_lastName: "",
    user_profile_location: "",
    user_profile_bio: "",
  };

  //State
  const [value, setValue] = useState(initialFormValues);
  const [dummy, setDummy] = useState([]);

  //grab data
  useEffect(() => {
    axios
      .get(`https://im-online.herokuapp.com/user/profile/${props.user_id}`)
      .then((res) => {
        setValue(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dummy, props.user_id]);

  //form submit

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://im-online.herokuapp.com/user/profile/${props.user_id}`,
        value
      )
      .then((res) => {
        window.alert("Your profile has been updated!");
        setDummy(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //form change
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <StyledDiv>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Update {props.user_username}'s Profile
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h4>First Name</h4>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="user_profile_firstName"
                  name="user_profile_firstName"
                  onChange={handleChange}
                  value={value.user_profile_firstName}
                />
              </Grid>
              <Grid item xs={12}>
                <h4>last Name</h4>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="user_profile_lastName"
                  name="user_profile_lastName"
                  onChange={handleChange}
                  value={value.user_profile_lastName}
                />
              </Grid>

              <Grid item xs={12}>
                <h4>Location</h4>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="user_profile_location"
                  name="user_profile_location"
                  onChange={handleChange}
                  value={value.user_profile_location}
                />
              </Grid>

              <Grid item xs={12}>
                <h4>Bio</h4>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="user_profile_bio"
                  name="user_profile_bio"
                  onChange={handleChange}
                  value={value.user_profile_bio}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Update
            </Button>
          </form>
        </div>
      </Container>
    </StyledDiv>
  );
};
const mapStateToProps = (state) => {
  return {
    user_username: state.user.user_username,
    user_id: state.user.user_id,
  };
};

export default connect(mapStateToProps)(UpdateProfile);
