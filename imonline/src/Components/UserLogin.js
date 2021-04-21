import React, { useState } from "react";
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
import { setUsername, setUserID } from "../Actions/userActions";
import { setLoggedIn } from "../Actions/logoutActions";

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
function UserLogin(props) {
  const classes = useStyles();
  const { push } = useHistory();

  //Form values
  const initialFormValues = {
    user_username: "",
    user_password: "",
  };

  //State
  const [value, setValue] = useState(initialFormValues);

  //Form change
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  //Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://im-online.herokuapp.com/user/information/auth/login",
        value
      )
      .then((res) => {
        props.setLoggedIn();
        props.setUsername(res.data.user_username);
        props.setUserID(res.data.user_id);
        localStorage.setItem("token", res.data.token);
        push("/createprofile");
      })
      .catch((err) => {
        console.log("Axios error, USER_LOGIN", err);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <h4>
        (Server may take a few seconds to boot-up due to it being hosted on Free
        Heroku. Please wait after clicking sign in.)
      </h4>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="user_username"
                label="Username"
                name="user_username"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="user_password"
                label="Password"
                type="password"
                id="user_password"
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
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user_username: state.user.user_username,
    user_id: state.user.user_id,
    loggedIn: state.sign.loggedIn,
  };
};

export default connect(mapStateToProps, {
  setUsername,
  setUserID,
  setLoggedIn,
})(UserLogin);
