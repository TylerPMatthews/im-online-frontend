import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import axios from "axios";

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

const CreatePost = (props) => {
  const { push } = useHistory();
  const classes = useStyles();
  const initialFormValues = {
    user_post_text: "",
    user_post_img: "",
    user_post_city: "",
    user_post_State: "",
    user_id: props.user_id
  };
  const [value, setValue] = useState(initialFormValues);

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
    .post('http://localhost:59283/user/post', value)
    .then(res=>{
      console.log(res)
      const newUID = parseInt(res.data)
      const data = {
        user_id:props.user_id,
        user_post_id:newUID
      }
      axios
      .post('http://localhost:59283/user/view/post', data)
      .then(res=>{
        push("/home");
      })
      .catch(err=>{
        console.log("Axios to view db error", err)
      })
    })
    .catch(err=>{
      console.log("Axios create post error", err)
    })
  };
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Create a post
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="user_post_text"
                  label="What's on your mind?..."
                  name="user_post_text"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="user_post_img"
                  label="Post Image (use image address)"
                  name="user_post_img"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="user_post_city"
                  label="City"
                  name="user_post_city"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="user_post_State"
                  label="State"
                  name="user_post_State"
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
};
const mapStateToProps = (state) => {
  return {
    user_username: state.user.user_username,
    user_id: state.user.user_id,
  };
};

export default connect(mapStateToProps)(CreatePost);
