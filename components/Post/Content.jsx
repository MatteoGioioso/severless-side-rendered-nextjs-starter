import React, { useEffect, useState } from "react";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import BottomSharedWidget from "../Posts/BottomShareWidget";
import styled from "styled-components";
import {colors} from "../Styled/vars";
import {useIsClient} from "../../services/helpers";

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

const Content = ({ post, postId, themeName }) => {
  return (
    <Container id="main" className="alt" themeName={themeName}>
      <section id="one" className="post-content-container">
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
