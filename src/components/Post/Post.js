import React from "react"

function Post(props) {
  const { title, text } = props;

  return (
    <div className="border-2 border-r-1 rounded border-black">
      {title}
      {text}
    </div>
  )
}

export default Post;
