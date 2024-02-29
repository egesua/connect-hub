import React from "react";
import Post from "../Post/Post";

import { useState, useEffect } from "react";
import { Container } from "@mui/material";

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    fetch("/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div> Error!! </div>;
  } else if (!isLoaded) {
    return <div> Loading... </div>;
  } else {
    return (
      <Container
        fixed
        className="flex flex-wrap justify-center items-center bg-slate-900 h-screen p-2"
      >
        {postList.map((post) => (
          <Post title={post.title} text={post.text}></Post>
        ))}
      </Container>
    );
  }
}

export default Home;
