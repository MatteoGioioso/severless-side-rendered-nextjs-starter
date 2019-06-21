import React from "react";

function Post({id}) {
  return (
    <div>
      <h1>Post id: {id}</h1>
    </div>
  );
}

Post.getInitialProps = async request => {
  const getId = request => {
    if (request.req) {
      return request.req.params.id;
    } else {
      return request.query.id;
    }
  };

  return {
    id: getId(request)
  };
};


export default Post;
