import React from "react";
import Post from "../Post/Post";

import { useState, useEffect } from "react";
import PostForm from "../Post/PostForm";


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
      <div className="d-flex flex-wrap justify-items-center items-center bg-whitey p-5 m-5 h-screen">
        <PostForm
          userId={1}
          username={"egesua"}
          title={"ortacabel"}
          text={"text"}
        />
        {postList.map((post) => (
          <Post
            userId={post.userId}
            username={post.username}
            title={post.title}
            text={post.text}
          ></Post>
        ))}
      </div>
    );
  }
}

export default Home;
