import {
  Button,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";

function CommentForm(props) {
  const { postId, userId, username } = props;
  const [text, setText] = useState("");

  const saveComment = () => {
    fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        userId: userId,
        text: text,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log("error"));
  };

  const handleSubmit = () => {
    saveComment();
  }

  const handleChange = (value) => {
    setText(value);
  }

  return (
    <div>
      <CardContent className="d-flex flex-wrap justify-start items-center">
        <OutlinedInput
          id="outlined-adornment-amount"
          multiline
          inputProps={{ maxLength: 250 }}
          fullWidth
          onChange={(i) => handleChange(i.target.value)}
          style={{color: "black", backgroundColor: 'white'}}
          startAdornment={
            <InputAdornment position="start">
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
            </InputAdornment>
          }
          endAdornment= {
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
                        Comment
                      </Button>
            </InputAdornment>
          }
          value={text}
        ></OutlinedInput>  
      </CardContent>
    </div>
  );
}

export default CommentForm;
