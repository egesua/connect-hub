import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import { Button, InputAdornment, OutlinedInput } from "@mui/material";

function PostForm(props) {
  const { username, userId, refreshPosts } = props;
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isSent, setIsSent] = useState(false);

  const savePost = () => {
    fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("tokenKey"),
      },
      body: JSON.stringify({
        title: title,
        userId: userId,
        text: text,
      }),
    })
      .then((res) => res.json())
      .catch((res) => console.log("error"));
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSent(false);
  };


  const handleSubmit = () => {
    savePost();
    refreshPosts();
    setTitle("");
    setText("");
    setIsSent(true);
  };

  const handleTitle = (value) => {
    setTitle(value);
    setIsSent(false);
  };

  const handleText = (value) => {
    setText(value);
    setIsSent(false);
  };

  return (
    <div>
      <Snackbar
        open={isSent}
        autoHideDuration={2000}
        onClose={handleClose}
        message="You just posted!"
      />
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
              title={
                <OutlinedInput
                  id="outlined-adornment-amount"
                  multiline
                  placeholder="Title"
                  inputProps={{ maxLength: 25 }}
                  fullWidth
                  value={title}
                  onChange={(i) => handleTitle(i.target.value)}
                ></OutlinedInput>
              }
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                <OutlinedInput
                  id="outlined-adornment-amount"
                  multiline
                  placeholder="Text"
                  inputProps={{ maxLength: 250 }}
                  fullWidth
                  value={text}
                  onChange={(i) => handleText(i.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <Button
                        onClick={handleSubmit}
                        variant="contained"
                        style={{
                          background:
                            "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                          color: "white",
                        }}
                      >
                        Post
                      </Button>
                    </InputAdornment>
                  }
                ></OutlinedInput>
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
