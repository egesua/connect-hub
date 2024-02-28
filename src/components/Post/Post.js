import React from "react"

import { useState, useEffect } from "react";

function Post() {
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
      <div>
        <ul>{postList.map(post => (
          <li>
            {post.title} {post.text}
          </li>
        ))}</ul>
      </div>
    );
  }
}

export default Post;
