import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { Container } from "@mui/material";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";

function Post(props) {
  const [expanded, setExpanded] = useState(false);
  const { title, text, username, userId, postId, likes } = props;
  const [commentOn, setCommentOn] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const isInitialMount = useRef(true);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);

  let disabled = localStorage.getItem("currentUser") === null ? true : false;

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(commentList);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      saveLike();
      setLikeCount(likeCount + 1);
    } else {
      deleteLike();
      setLikeCount(likeCount - 1);
    }
  };

  const handleComment = () => {
    setCommentOn(!commentOn);
  };

  const refreshComments = () => {
    fetch("/comments?postId=" + postId)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          console.log("error");
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const saveLike = () => {
    fetch("/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("tokenKey")
      },
      body: JSON.stringify({
        postId: postId,
        userId: userId,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const deleteLike = () => {
    fetch("/likes/" + likeId, {
      method: "DELETE",
      headers: {
        "Authorization": localStorage.getItem("tokenKey")
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const checkLikes = () => {
    var likeControl = likes.find((like) => like.userId === localStorage.getItem("currentUser"));
    if (likeControl != null) {
      setLikeId(likeControl.id);
      setIsLiked(true);
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      refreshComments();
    }
  }, [commentList]);

  useEffect(() => {
    checkLikes();
  }, []);

  return (
    <div className="flex justify-center flex-wrap text-left m-5">
      <div className="m-4 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl flex-grow">
        <Card sx={{ maxWidth: 800 }}>
          <CardHeader
            avatar={
              <Link to={{ pathname: "/users/" + userId }}>
                <Avatar
                  sx={{
                    background:
                      "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  }}
                  aria-label="recipe"
                >
                  {username.charAt(0).toUpperCase()}
                </Avatar>
              </Link>
            }
            title={title}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {text}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {disabled ? (
              <IconButton
                disabled
                onClick={handleLike}
                aria-label="add to favorites"
              >
                <FavoriteIcon style={isLiked ? { color: "red" } : null} />
              </IconButton>
            ) : (
              <IconButton onClick={handleLike} aria-label="add to favorites">
                <FavoriteIcon style={isLiked ? { color: "red" } : null} />
              </IconButton>
            )}
            {likeCount}
            <IconButton
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <CommentIcon
                style={commentOn ? { color: "red" } : null}
                onClick={handleComment}
              />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Container fixed className="d-flex">
              {error
                ? "error"
                : isLoaded
                ? commentList.map((comment) => (
                    <Comment
                      userId={1}
                      username={"egesua"}
                      text={comment.text}
                    ></Comment>
                  ))
                : "Loading"}
              {disabled ? (
                ""
              ) : (
                <CommentForm
                  userId={1}
                  username={"egesua"}
                  postId={postId}
                ></CommentForm>
              )}
            </Container>
          </Collapse>
        </Card>
      </div>
    </div>
  );
}

export default Post;
