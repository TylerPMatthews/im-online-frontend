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

const CreatePost = (props) => {
  //push to new page
  const { push } = useHistory();
  const classes = useStyles();

  //Form values
  const initialFormValues = {
    user_post_text: "",
    user_post_city: "",
    user_post_State: "",
    user_id: props.user_id,
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
    //Submits the post
    axios
      .post("https://im-online.herokuapp.com/user/post", value)
      .then((res) => {
        const newUID = parseInt(res.data);
        const PostData = {
          user_post_id: newUID,
        };
        //Submits a new liked post defaulting to 0
        axios
          .post("https://im-online.herokuapp.com/user/post/liked", PostData)
          .then((res) => {
            const newLikedID = parseInt(res.data);
            //Submits a new disliked post defaulting to 0
            axios
              .post(
                "https://im-online.herokuapp.com/user/post/disliked",
                PostData
              )
              .then((res) => {
                const newDislikedID = parseInt(res.data);
                const data = {
                  user_id: props.user_id,
                  user_post_id: newUID,
                  user_post_liked_id: newLikedID,
                  user_post_disliked_id: newDislikedID,
                };
                //Submits all IDS
                axios
                  .post("https://im-online.herokuapp.com/user/view/post", data)
                  .then((res) => {
                    console.log(res);
                    push("/home");
                  })
                  .catch((err) => {
                    console.log("Axios to view db error", err);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("Axios create post error", err);
      });
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
