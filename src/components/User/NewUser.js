import React from "react"
import { useParams } from "react-router-dom";

function User() {

    const {userId} = useParams();

    
    useEffect(() => {
        if (isInitialMount.current) {
          isInitialMount.current = false;
        } else {
          refreshComments();
        }
      }, [commentList]);
    
      useEffect(() => {
        checkLikes();
      }, []);
    

  return (
    <div>
      User!! {userId}
    </div>
  )
};

export default User;
