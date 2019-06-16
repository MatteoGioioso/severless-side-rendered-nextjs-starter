import React from 'react';
import styled from "styled-components";

function displayDate(createdAt) {
  return new Date(createdAt)
    .toUTCString()
    .split(" ")
    .slice(0, 4)
    .join(" ");
}

const PostTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  padding: 2%;
`;

const TitleBanner = ({post, createdAt}) => {
  return (
    <PostTitleContainer className="post-title-container">
      <div>
        <header className="major" style={{ marginBottom: "3%" }}>
          <h1
            style={{
              fontWeight: "400",
              lineHeight: "3.5rem",
              maxWidth: "98vw"
            }}
          >
            {post.title}
          </h1>
        </header>
        <h5 style={{ fontWeight: "200", fontSize: "20px" }}>
          {post.summary}
        </h5>

        <div>
          <h4 style={{ fontSize: "16px", marginBottom: "0px" }}>
            {post.author}
          </h4>
          <p style={{ fontSize: "16px", marginBottom: "0px" }}>
            {post.authorTitle}
          </p>
          <p
            style={{
              fontSize: "16px",
              marginBottom: "0px",
              fontWeight: "400"
            }}
          >
            {displayDate(createdAt)}
          </p>
        </div>
      </div>
      <br />
    </PostTitleContainer>
  );
};

export default TitleBanner;
