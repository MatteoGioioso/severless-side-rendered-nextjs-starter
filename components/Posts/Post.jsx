import React from "react";
import Link from "next/link";
import { colors } from "../Styled/vars";
import styled from "styled-components";

const SectionContainer = styled.section`
  cursor: pointer;
  margin: 8%;
  border: 1px solid ${colors.fglighter};
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
`;


const Post = ({
  title,
  id,
  summary,
  imageUrl,
  createdAt,
  author,
  authorTitle
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

  return (
    <SectionContainer>
      <Link href={`/post?postId=${postId}`} as={`/post/${postId}`}>
        <a className="image">
          <img src={imageUrl} alt="" />
        </a>
      </Link>
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

            <div>
              <ul className="icons" style={{margin: 0}}>
                <li style={{ paddingRight: "5px" }}>
                  <a
                    href="#"
                    className="icon icon-article alt fa-twitter fa-sm"
                  >
                    <span className="label">Twitter</span>
                  </a>
                </li>
                <li style={{ paddingRight: "5px" }}>
                  <a href="#" className="icon icon-article alt fa-facebook">
                    <span className="label">Facebook</span>
                  </a>
                </li>
                <li style={{ paddingRight: "5px" }}>
                  <a href="#" className="icon icon-article alt fa-instagram">
                    <span className="label">Instagram</span>
                  </a>
                </li>
                <li style={{ paddingRight: "5px" }}>
                  <a href="#" className="icon icon-article alt fa-github">
                    <span className="label">GitHub</span>
                  </a>
                </li>
                <li style={{ paddingRight: "5px" }}>
                  <a href="#" className="icon icon-article alt fa-linkedin">
                    <span className="label">LinkedIn</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Post;
