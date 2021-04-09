import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardMedia from '@material-ui/core/CardMedia';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import styled from "styled-components";


const StyledDiv = styled.div`

`;

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 50
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 20,
  },
  media: {
    height: 300,
    width:300,
    display:"flex",
    justifyContent: "center"
  },
});

const GetPosts = () => {
  const classes = useStyles();

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:59283/user/view/post")
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log("Axios get all posts error", err);
      });
  }, []);
  return (
    <StyledDiv>
      <div className="postwrapper">
        <h3>Recent Post's</h3>
        {posts.map((item, idx) => {
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
                  <Typography variant="h5" component="h2">
                    <p>{item.user_post_text}</p>
                    <div className="post_image">
                      {item.user_post_img.length < 1 ? (
                        <div></div>
                      ) : (
                        <CardMedia
                        className={classes.media}
                        image={item.user_post_img}
                        
                      />
                      )}
                    </div>
                  </Typography>
               
                  <Typography variant="body2" component="p">
                    {item.user_post_city} , {item.user_post_State}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Comments</Button>
                  <Button size="small">Like {""}<ThumbUpIcon/> </Button>
                      <Button size="small">Dislike {""} <ThumbDownIcon/></Button>
                </CardActions>
              </Card>
            </div>
          );
        })}
      </div>
    </StyledDiv>
  );
};
export default GetPosts;
