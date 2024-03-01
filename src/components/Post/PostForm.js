import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { OutlinedInput } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function PostForm(props) {
  const [expanded, setExpanded] = useState(false);
  const { title, text, username, userId } = props;
  const [liked, setLiked] = useState(false);
  const [commentOn, setCommentOn] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleComment = () => {
    setCommentOn(!commentOn);
  };

  return (
    <div className="flex justify-center flex-wrap text-left m-5">
      <div className="m-4 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl flex-grow">
        <Card sx={{ maxWidth: 800 }}>
          <CardHeader
            avatar={
              <Link to={{ pathname: "/users/" + userId }}>
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {username.charAt(0).toUpperCase()}
                </Avatar>
              </Link>
            }
            title={
              <OutlinedInput
                id="outlined-adornment-amount"
                multiline
                placeholder="Title"
                inputProps={{ maxLength: 25 }}
                fullWidth
              ></OutlinedInput>
            }
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
            <OutlinedInput
                id="outlined-adornment-amount"
                multiline
                placeholder="Text"
                inputProps={{ maxLength: 250}}
                fullWidth
              ></OutlinedInput>
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton onClick={handleLike} aria-label="add to favorites">
              <FavoriteIcon style={liked ? { color: "red" } : null} />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <CommentIcon
                style={commentOn ? { color: "red" } : null}
                onClick={handleComment}
              />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent></CardContent>
          </Collapse>
        </Card>
      </div>
    </div>
  );
}

export default PostForm;
