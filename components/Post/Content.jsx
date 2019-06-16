import React from 'react';
import Observer from "@researchgate/react-intersection-observer";
import {documentToHtmlString} from "@contentful/rich-text-html-renderer";
import BottomSharedWidget from "../Posts/BottomShareWidget";

const Content = ({post, postId, options}) => {
  return (
    <div id="main" className="alt">
      <section id="one" className="post-content-container">
        <Observer {...options}>
          <div data-name="articleStart" />
        </Observer>

        <div className="inner">
          <div
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

    </div>
  );
};

export default Content;
