import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";

//Styles
const StyledDiv = styled.div`
  text-align: center;
  h3 {
    color: white;
    padding: 2%;
  }
  .postwrapper h3 {
    color: black;
    padding-top: 5%;
  }
  .bodytext {
    display: flex;
    justify-content: center;
    word-wrap: break-word;
  }
  .bodytext p {
    max-width: 250px;
  }
`;

//Card styles
const useStyles = makeStyles({
  root: {
    minWidth: 375,
    marginRight: 25,
    marginLeft: 20,
    marginBottom:25,
  },
  title: {
    fontSize: 20,
    color: "red",
  },
  pos: {
    marginBottom: 20,
  },
  media: {
    height: 300,
    width: 300,
    display: "flex",
    justifyContent: "center",
  },
  body: {
    textAlign: "center",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
  },
});

const GetPosts = (props) => {
  const classes = useStyles();

  //Push to page
  const { push } = useHistory();

  //State
  const [posts, setPosts] = useState([]);
  const [liked, setLiked] = useState([]);

  //Get all posts
  useEffect(() => {
    axios
      .get("https://im-online.herokuapp.com/user/view/post")
      .then((res) => {
        const data = res.data;
        const reversedData = data.reverse();
        setPosts(reversedData);
      })
      .catch((err) => {
        console.log("Axios get all posts error", err);
      });
  }, [liked]);
  return (
    <StyledDiv>
      <div className="postwrapper">
        <h3>Recent Posts</h3>
        {posts.map((item, idx) => {
          //Like a post
          const likePost = () => {
            const addLike = item.user_post_liked + 1;
            const likedData = {
              user_post_liked: addLike,
              user_post_id: item.user_post_id,
            };
            axios
              .put(
                `https://im-online.herokuapp.com/user/post/liked/${item.user_post_id}`,
                likedData
              )
              .then((res) => {
                setLiked(res);
              })
              .catch((err) => {
                console.log(err);
              });
          };

          //Dislike a post
          const dislikePost = () => {
            const addDislike = item.user_post_disliked + 1;
            const dislikedData = {
              user_post_disliked: addDislike,
              user_post_id: item.user_post_id,
            };
            axios
              .put(
                `https://im-online.herokuapp.com/user/post/disliked/${item.user_post_id}`,
                dislikedData
              )
              .then((res) => {
                setLiked(res);
              })
              .catch((err) => {
                console.log(err);
              });
          };

          //Delete a post
          const deletePost = () => {
            axios
              .delete(
                `https://im-online.herokuapp.com/user/post/${item.user_post_id}`
              )
              .then((res) => {
                setLiked(res);
              })
              .catch((err) => {
                console.log(err);
              });
          };

          return (
            <div key={idx}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography className={classes.title} gutterBottom>
                    {item.user_username}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={classes.body}
                  >
                    <div className="bodytext">
                      <p>{item.user_post_text}</p>
                    </div>
                  </Typography>

                  <Typography variant="body2" component="p">
                    {item.user_post_city} , {item.user_post_State}
                  </Typography>
                </CardContent>
                <CardActions className={classes.buttons}>
                  <Button
                    size="small"
                    onClick={() => {
                      push(`/comments:${item.user_post_id}`);
                    }}
                  >
                    Comments
                  </Button>
                  <IconButton size="small" color="primary" onClick={likePost}>
                    Like {item.user_post_liked}
                    <ThumbUpIcon />{" "}
                  </IconButton>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={dislikePost}
                  >
                    Dislike {item.user_post_disliked} <ThumbDownIcon />
                  </IconButton>
                  {props.user_username === item.user_username ? (
                    <Button size="small" onClick={deletePost}>
                      Delete
                    </Button>
                  ) : (
                    <div></div>
                  )}
                </CardActions>
              </Card>
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

export default connect(mapStateToProps)(GetPosts);
