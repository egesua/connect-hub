import React from "react"

function Post(props) {
  const { title, text } = props;

  return (
    <div className="border-2 border-black border-solid">
      {title}
      {text}
    </div>
  )
}

export default Post;
