import React, { useEffect, useState } from "react";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

const StyledDiv = styled.div`

text-align:center;`

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

const Comments = (props) => {
  const classes = useStyles();
  const { id } = useParams();
  const newID = id.replace(/:/g, "");
  const { push } = useHistory();
  const initialFormValues = {
    user_comment_text: "",
    user_id: props.user_id,
    user_post_id: newID,
  };

  const [value, setValue] = useState(initialFormValues);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState([])
  useEffect(() => {
    axios
      .get(`http://localhost:59283/user/comment/view/${newID}`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log("Axios comments error", err);
      });
  }, [newComment, newID]);

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:59283/user/comment", value)
      .then((res) => {
        setValue(initialFormValues)
        const newUID = parseInt(res.data);
        const data = {
          user_id: props.user_id,
          user_post_id: newID,
          user_comment_id: newUID,
        };
        
        axios
          .post("http://localhost:59283/user/comment/view", data)
          .then((res) => {
            setNewComment(res)
          })
          .catch((err) => {
            console.log("Axios to view db error", err);
          });
      })
      .catch((err) => {
        console.log("Axios create post error", err);
      });
  };

  console.log(comments)
  return (
    <StyledDiv>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Comment
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="user_comment_text"
                  label="Comment ..."
                  name="user_comment_text"
                  onChange={handleChange}
                  value={value.user_comment_text}
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
              Post comment
            </Button>
          </form>
        </div>
      </Container>

      <div>
        <h2>User Comments</h2>
        {comments.map((item, idx) => {
          return (
            <div key={idx}>
              <h4> username: {item.user_username}</h4>
              <p>{item.user_comment_text}</p>
            </div>
          );
        })}
      </div>
    </StyledDiv>
  );
};
const mapStateToProps = (state) => {
  return {
    user_username: state.user.user_username,
    user_id: state.user.user_id,
  };
};

export default connect(mapStateToProps)(Comments);
