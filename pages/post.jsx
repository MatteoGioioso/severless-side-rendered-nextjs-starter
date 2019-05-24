import Layout from "../components/Layout";
import { contentfulClient } from "../services/Contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import SEO from "../components/SEO";
import React from "react";
import { registerServiceWorker } from "../services/helpers";
import ShareWidget from "../components/Posts/ShareWidget";
import { colors } from "../components/Styled/vars";
import styled from "styled-components";

const PostTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.displayDate = this.displayDate.bind(this);
  }

  componentDidMount() {
    registerServiceWorker();
  }

  displayDate() {
    return new Date(this.props.createdAt)
      .toUTCString()
      .split(" ")
      .slice(0, 4)
      .join(" ");
  }

  render() {
    const { post, postId } = this.props;

    return (
      <Layout>
        <SEO
          seoConfig={{
            title: post.title,
            description: post.summary,
            url: postId
          }}
        />

        <PostTitleContainer className="post-title-container">
          <div>
            <header className="major" style={{ marginBottom: "3%" }}>
              <h1 style={{ fontWeight: "400", lineHeight: "3.5rem", maxWidth: '98vw' }}>
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
                {this.displayDate()}
              </p>
            </div>
          </div>
          <br />
        </PostTitleContainer>

        <div
          style={{
            width: "100%",
            height: "350px",
            background: `url("${post.imagesUrls[0]}") center no-repeat`,
            backgroundSize: "cover"
          }}
        />

        <div id="main" className="alt">
          <section id="one">
            <div className="inner">
              <div
                className="markdown-post"
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(post.content)
                }}
              />
            </div>
          </section>
        </div>
        <ShareWidget url={`https://blog.hirvitek.com/post/${postId}`} />
      </Layout>
    );
  }
}

Post.getInitialProps = async request => {
  const getId = request => {
    if (request.req) {
      return request.req.params.postId;
    } else {
      return request.query.postId;
    }
  };

  const postId = getId(request);

  const id = postId.split("_")[1];

  const data = await contentfulClient.getEntry(id);

  return {
    post: data.fields,
    createdAt: data.sys.createdAt,
    postId
  };
};

export default Post;
