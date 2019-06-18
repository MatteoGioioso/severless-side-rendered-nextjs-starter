import Layout from "../components/Layout";
import { contentfulClient } from "../services/Contentful";
import SEO from "../components/SEO";
import React from "react";
import TitleBanner from "../components/Post/TitleBanner";
import Content from "../components/Post/Content";
import { withStoreConsumer } from "../components/Store/Store";

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobile: false,
      bottomWidget: false,
      articleStart: true,
      themeName: "morning"
    };
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
    this.cachePost();
  }

  render() {
    const { post, postId } = this.props;

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

        <TitleBanner
          post={this.props.post}
          createdAt={this.props.createdAt}
          themeName={this.props.themeName}
        />

        <div
          style={{
            width: "100%",
            height: "350px",
            background: `url("${post.imagesUrls[0]}") center no-repeat`,
            backgroundSize: "cover"
          }}
        />

        <Content
          post={post}
          postId={postId}
          themeName={this.props.themeName}
        />
      </Layout>
    );
  }
}

const PostWithConsumer = withStoreConsumer(Post);

PostWithConsumer.getInitialProps = async request => {
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

export default PostWithConsumer;
