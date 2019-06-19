import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import BottomSharedWidget from "../Posts/BottomShareWidget";
import styled from "styled-components";
import { useIsClient } from "../../services/helpers";
import Highlight from "react-highlight";
import { MARKS } from "@contentful/rich-text-types";
import "../../static/css/a11y-dark.css";

const options = {
  renderMark: {
    [MARKS.CODE]: code => {
      if (code.length >= 30) {
        return <Highlight className="javascript">{code}</Highlight>;
      } else {
        return <code>{code}</code>;
      }
    }
  }
};

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
    margin: 0 0 0.2em 0;
    color: ${props => props.theme[props.themeName].textColor} !important;
    a {
      color: inherit;
    }
  }
  p{
    margin: 0 0 1.5em 0;
  }
  pre {
    margin: 0;
  }
  code{
    font-size: 14px
  }
`;

const Content = ({ post, postId, themeName }) => {
  return (
    <Container id="main" className="alt" themeName={themeName}>
      <section id="one" className="post-content-container">
        <Markdown className="inner" themeName={themeName}>
          {documentToReactComponents(post.content, options)}
        </Markdown>
      </section>

      <div
        data-name="bottomWidget"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "-50px"
        }}
      >
        {useIsClient() && <BottomSharedWidget post={post} />}
      </div>
    </Container>
  );
};

export default Content;
