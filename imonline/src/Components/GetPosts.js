import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const StyledDiv = styled.div`
  text-align: center;
  h3 {
    color: white;
    padding: 2%;
  }
  .postwrapper h3 {
    color: red;
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

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 50,
  },
  title: {
    fontSize: 20,
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
  const { push } = useHistory();
  const [posts, setPosts] = useState([]);
  const [liked, setLiked] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:59283/user/view/post")
      .then((res) => {
        const data = res.data;
        const reversedData = data.reverse();
        setPosts(reversedData);
      })
      .catch((err) => {
        console.log("Axios get all posts error", err);
      });
  }, [liked]);
  console.log(posts);
  return (
    <StyledDiv>
      <div className="postwrapper">
        <h3>Recent Posts</h3>
        {posts.map((item, idx) => {
          const likePost = () => {
            item.user_post_liked_username !== null ? (
              item.user_post_liked_username.push(props.user_username)
            ) : (
              <div></div>
            );

            axios
              .put(
                `http://localhost:59283/user/post/liked/${item.user_post_id}`,
                item.user_post_liked_username
              )
              .then((res) => {
                setLiked(res);
              })
              .catch((err) => {
                console.log(err);
              });
          };

          const dislikePost = () => {
            const newDislikedData = {
              user_post_id: item.user_post_id,
              user_post_liked_thumbDown: item.user_post_liked_thumbDown + 1,
            };

            axios
              .put(
                `http://localhost:59283/user/post/liked/${item.user_post_id}`,
                newDislikedData
              )
              .then((res) => {
                setLiked(res);
              })
              .catch((err) => {
                console.log(err);
              });
          };

          const deletePost = () => {
            axios
              .delete(`http://localhost:59283/user/post/${item.user_post_id}`)
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
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
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
                  <Button size="small" onClick={likePost}>
                    Like{" "}
                    {item.user_post_liked_username !== null ? (
                      item.user_post_liked_username.length
                    ) : (
                      <div></div>
                    )}
                    <ThumbUpIcon />{" "}
                  </Button>
                  <Button size="small" onClick={dislikePost}>
                    Dislike {item.user_post_liked_thumbDown} <ThumbDownIcon />
                  </Button>
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
