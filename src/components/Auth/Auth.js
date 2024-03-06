import {
  Button,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import React from "react";

function Auth() {
  return (
    <FormControl>
      <InputLabel>Username</InputLabel>
      <Input />
      <InputLabel style={{ top: 80 }}>Password</InputLabel>
      <Input style={{ top: 40 }} />
      <Button
        variant="contained"
        style={{
          marginTop: 60,
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%",
          color: "white",
        }}
      >
        Register
      </Button>
      <FormHelperText style={{ margin: 20 }}>
        Are you already registered ?
      </FormHelperText>
      <Button
        variant="contained"
        style={{
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%",
          color: "white",
        }}
      >
        Login
      </Button>
    </FormControl>
  );
}

export default Auth;
