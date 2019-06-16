import React from "react";
import Observer from "@researchgate/react-intersection-observer";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import BottomSharedWidget from "../Posts/BottomShareWidget";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${props =>
    props.theme[props.themeName].backgroundColor} !important;
  color: ${props => props.theme[props.themeName].textColor} !important;
`;

const Markdown = styled.div`
  b,
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

const Content = ({ post, postId, options, themeName }) => {
  return (
    <Container id="main" className="alt" themeName={themeName}>
      <section id="one" className="post-content-container">
        <Observer {...options}>
          <div data-name="articleStart" />
        </Observer>

        <div className="inner">
          <Markdown
            themeName={themeName}
            className="markdown-post"
            dangerouslySetInnerHTML={{
              __html: documentToHtmlString(post.content)
            }}
          />
        </div>
      </section>

      <Observer {...options}>
        <div
          data-name="bottomWidget"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "-50px"
          }}
        >
          <BottomSharedWidget
            url={`https://blog.hirvitek.com/post/${postId}`}
          />
        </div>
      </Observer>
    </Container>
  );
};

export default Content;
