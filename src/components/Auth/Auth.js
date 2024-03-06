import { FormControl, Input, InputLabel } from "@mui/material";
import React from "react"

function Auth() {
  return (
    <FormControl>
        <InputLabel>Username</InputLabel>
        <Input />
        <InputLabel>Password</InputLabel>
        <Input />
    </FormControl>
  )
};

export default Auth;
