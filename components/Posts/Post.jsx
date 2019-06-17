import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { withRouter } from "next/router";
import { PostPageLoading } from "./Loaders";

const SectionContainer = styled.section`
  cursor: pointer;
  margin: 3%;
  background-color: ${props =>
    props.theme[props.themeName].backgroundColor} !important;
  transition: all 200ms ease-in-out;
  &:hover {
    background-color: ${props =>
      props.theme[props.themeName].backgroundColorHover} !important;
  }
`;

const Subtitle = styled.h5`
  font-size: 13px;
  font-weight: 400;
  margin-bottom: 0;
`;

const Post = ({
  title,
  id,
  summary,
  imageUrl,
  createdAt,
  author,
  authorTitle,
  themeName,
  router
}) => {
  const postId = `${title
    .toLowerCase()
    .split(" ")
    .join("-")}_${id}`;

  const displayDate = new Date(createdAt)
    .toUTCString()
    .split(" ")
    .slice(0, 4)
    .join(" ");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    router.prefetch(`/post`);
  });

  function handleClickPost() {
    //when offline we nee to navigate
    if (navigator.onLine) {
      setIsLoading(true);
      setTimeout(
        () => router.push(`/post?postId=${postId}`, `/post/${postId}`),
        100
      );
    } else {
      const offlineLink = document.createElement("a");
      offlineLink.href = `/post/${postId}`;
      document.body.appendChild(offlineLink);
      offlineLink.click();
      document.body.removeChild(offlineLink);
    }
  }

  return (
    <>
      <SectionContainer onClick={handleClickPost} themeName={themeName}>
        <a className="image">
          <img src={imageUrl} alt="" />
        </a>

        <div className="content">
          <div className="inner">
            <header className="major" style={{ marginBottom: "10px" }}>
              <h3 style={{ fontSize: "18px" }}>{title}</h3>
            </header>
            <p style={{ fontSize: "16px", marginBottom: "20px" }}>
              {summary.substring(0, 300)}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between"
            }}
          >
            <div>
              <Subtitle>{author}</Subtitle>
              <p style={{ fontSize: "13px", marginBottom: "20px" }}>
                {authorTitle}
              </p>
            </div>

            <div>
              <div>
                <Subtitle>{displayDate}</Subtitle>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
      {isLoading && <PostPageLoading />}
    </>
  );
};

export default withRouter(Post);
