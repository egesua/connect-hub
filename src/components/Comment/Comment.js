import {
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";

function Comment(props) {
  const { text, userId, username } = props;

  return (
    <div>
      <CardContent className="d-flex flex-wrap justify-start items-center">
        <OutlinedInput
          disabled
          id="outlined-adornment-amount"
          multiline
          inputProps={{ maxLength: 25 }}
          fullWidth
          value={text}
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
        ></OutlinedInput>  
      </CardContent>
    </div>
  );
}

export default Comment;
