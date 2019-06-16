import React from "react";
import styled from "styled-components";
import { FaMoon, FaRegCheckCircle, FaSyncAlt } from "react-icons/fa";
import { useIsClient } from "../../services/helpers";
import { TopShareWidget } from "../Posts/BottomShareWidget";

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
  background-color: ${props =>
    props.theme[props.themeName].backgroundColor} !important;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${props => props.theme[props.themeName].textColor} !important;
    a {
      color: inherit;
    }
  }
`;

const TitleBanner = ({
  post,
  createdAt,
  handleThemeChange,
  themeName
}) => {
  return (
    <PostTitleContainer className="post-title-container" themeName={themeName}>
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
        <h5 style={{ fontWeight: "200", fontSize: "20px" }}>{post.summary}</h5>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
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

          {useIsClient() && <TopShareWidget post={post} />}
          <div style={{ padding: "15px" }}>
            <FaMoon
              style={{ cursor: "pointer", fontSize: "20px" }}
              onClick={handleThemeChange}
            >
              Change Theme
            </FaMoon>
          </div>
        </div>
      </div>
      <br />
    </PostTitleContainer>
  );
};

export default TitleBanner;
