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

const Post = ({ title, id, summary, imageUrl, createdAt }) => {
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
          <header className="major">
            <h3 style={{ color: colors.bgalt }}>{title}</h3>
          </header>
          <p>{summary.substring(0, 300)}</p>
          <ul className="actions" />
        </div>

        <div>
          <h5 style={{ color: colors.bgalt }}>{displayDate} </h5>
        </div>

        <div>
          <ul className="icons">
            <li>
              <a href="#" className="icon alt fa-twitter">
                <span className="label">Twitter</span>
              </a>
            </li>
            <li>
              <a href="#" className="icon alt fa-facebook">
                <span className="label">Facebook</span>
              </a>
            </li>
            <li>
              <a href="#" className="icon alt fa-instagram">
                <span className="label">Instagram</span>
              </a>
            </li>
            <li>
              <a href="#" className="icon alt fa-github">
                <span className="label">GitHub</span>
              </a>
            </li>
            <li>
              <a href="#" className="icon alt fa-linkedin">
                <span className="label">LinkedIn</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Post;
