import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

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
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function UserCreateProfile(props) {
  const classes = useStyles();
  const { push } = useHistory();

  //form values
  const initialFormValues = {
    user_profile_firstName: "",
    user_profile_lastName: "",
    user_profile_bio: "",
    user_profile_location: "",
    user_id: props.user_id,
  };

  //State
  const [value, setValue] = useState(initialFormValues);

  //Get profile
  useEffect(() => {
    axios
      .get(`http://localhost:59283/user/profile/${props.user_id}`)
      .then((res) => {
        if (res.data.length > 0) {
          push("/home");
        }
      })
      .catch((err) => {
        console.log("GET create profile error", err);
      });
  }, [props.user_id, push]);

  //Form chnage
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  //form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://im-online.herokuapp.com/user/profile", value)
      .then((res) => {
        push("/home");
      })
      .catch((err) => {
        console.log("Axios error, USER_PROFILE", err);
      });
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Create profile
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="user_profile_firstName"
                  label="First name"
                  name="user_profile_firstName"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="user_profile_lastName"
                  label="Last name"
                  name="user_profile_lastName"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="user_profile_bio"
                  label="Bio"
                  name="user_profile_bio"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="user_profile_location"
                  label="Location"
                  name="user_profile_location"
                  onChange={handleChange}
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
              Create
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user_username: state.user.user_username,
    user_id: state.user.user_id,
  };
};

export default connect(mapStateToProps)(UserCreateProfile);
