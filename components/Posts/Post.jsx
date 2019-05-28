import React, { useEffect, useState } from "react";
import { colors } from "../Styled/vars";
import styled from "styled-components";
import { withRouter } from "next/router";
import HirvitekHead from "../HirvitekHead";

const SectionContainer = styled.section`
  cursor: pointer;
  margin: 3%;
  /* border: 1px solid ${colors.whitebg_2}; */
  background-color: ${colors.whitebg} !important;
  transition: all 200ms ease-in-out;
  &:hover {
    background-color: ${colors.whitebg_2} !important;
  }
`;

const Subtitle = styled.h5`
  color: ${colors.bgalt};
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

  return (
    <>
      <SectionContainer
        onClick={() => {
          setIsLoading(true);
          setTimeout(
            () => router.push(`/post?postId=${postId}`, `/post/${postId}`),
            100
          );
        }}
      >
        <a className="image">
          <img src={imageUrl} alt="" />
        </a>

        <div className="content">
          <div className="inner">
            <header className="major" style={{ marginBottom: "10px" }}>
              <h3 style={{ color: colors.bgalt, fontSize: "18px" }}>{title}</h3>
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
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: colors.bg,
            zIndex: "1"
          }}
        >
          <div
            style={{
              display: "flex",
              height: "100vh",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center"
            }}
          >
            <h1 style={{ color: colors.bgalt, fontSize: "18px" }}>
              Loading...
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(Post);
