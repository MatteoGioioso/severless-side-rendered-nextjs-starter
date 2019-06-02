import Layout from "../components/Layout";
import { contentfulClient } from "../services/Contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import SEO from "../components/SEO";
import React from "react";
import { isMobile } from "../services/helpers";
import ShareWidget from "../components/Posts/ShareWidget";
import styled from "styled-components";
import BottomSharedWidget from "../components/Posts/BottomShareWidget";
import Observer from "@researchgate/react-intersection-observer";

const PostTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  padding: 2%;
`;

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobile: false,
      bottomWidget: false,
      articleStart: true
    };

    this.displayDate = this.displayDate.bind(this);
    this.handleIntersection = this.handleIntersection.bind(this);
  }

  handleIntersection(event) {
    const name = event.target.dataset.name;
    this.setState({ [name]: event.isIntersecting });
  }

  //Dynamic SSR html caching
  cachePost() {
    if ("caches" in window) {
      caches.open("static-cache").then(cache => {
        cache.addAll([`/post/${this.props.postId}`]);
      });
    }
  }

  componentDidMount() {
    this.setState({ isMobile: isMobile() });
    this.cachePost();
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

    const options = {
      onChange: this.handleIntersection,
      rootMargin: "0% 0% 0%"
    };

    const renderSharingWidget = () => {
      if (!this.state.bottomWidget && !this.state.articleStart) {
        return <ShareWidget url={`https://blog.hirvitek.com/post/${postId}`} />;
      }
    };

    return (
      <Layout>
        <SEO
          seoConfig={{
            title: post.title,
            description: post.summary,
            url: postId,
            imageUrl: post.imagesUrls[0]
          }}
        />

        <PostTitleContainer className="post-title-container">
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

          {/*<form method="post" action="#">*/}
          {/*  <div className="field half">*/}
          {/*    <input type="text" name="email" id="email" placeholder="Email" />*/}
          {/*  </div>*/}

          {/*  <input type="submit" value="Subscribe" className="special" />*/}
          {/*</form>*/}
        </div>

        {!this.state.isMobile && renderSharingWidget()}
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
