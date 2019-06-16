import Layout from "../components/Layout";
import { contentfulClient } from "../services/Contentful";
import SEO from "../components/SEO";
import React from "react";
import { isMobile } from "../services/helpers";
import ShareWidget from "../components/Posts/ShareWidget";
import styled, {ThemeProvider} from "styled-components";
import TitleBanner from "../components/Post/TitleBanner";
import Content from "../components/Post/Content";

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobile: false,
      bottomWidget: false,
      articleStart: true,
      isThemeNight: false
    };

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

        <TitleBanner post={this.props.post} createdAt={this.props.createdAt} />

        <div
          style={{
            width: "100%",
            height: "350px",
            background: `url("${post.imagesUrls[0]}") center no-repeat`,
            backgroundSize: "cover"
          }}
        />

        <Content post={post} postId={postId} options={options} />

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
