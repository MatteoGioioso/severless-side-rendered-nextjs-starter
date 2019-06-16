import Layout from "../components/Layout";
import { contentfulClient } from "../services/Contentful";
import SEO from "../components/SEO";
import React from "react";
import TitleBanner from "../components/Post/TitleBanner";
import Content from "../components/Post/Content";
import { StoreProvider, withStoreConsumer } from "../components/Store/Store";

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobile: false,
      bottomWidget: false,
      articleStart: true,
      themeName: "morning",
      isPostAvailableOffline: false
    };

    this.handleIntersection = this.handleIntersection.bind(this);
    this.handleThemeChange = this.handleThemeChange.bind(this);
  }

  handleIntersection(event) {
    const name = event.target.dataset.name;
    this.setState({ [name]: event.isIntersecting });
  }

  //Dynamic SSR html caching
  cachePost() {
    if ("caches" in window) {
      caches.open("static-cache").then(cache => {
        cache
          .addAll([`/post/${this.props.postId}`])
          .then(() => this.setState({ isPostAvailableOffline: true }));
      });
    }
  }

  componentDidMount() {
    this.cachePost();
  }

  handleThemeChange() {
    this.setState(prevState => {
      const nextState = prevState.themeName === "morning" ? "night" : "morning";
      return { themeName: nextState };
    });
  }

  render() {
    const { post, postId } = this.props;

    const options = {
      onChange: this.handleIntersection,
      rootMargin: "0% 0% 0%"
    };

    return (
      <Layout themeName={this.props.themeName}>
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
          handleThemeChange={this.props.handleThemeChange}
          isPostAvailableOffline={this.state.isPostAvailableOffline}
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
          options={options}
          themeName={this.props.themeName}
        />
      </Layout>
    );
  }
}

const PostWithConsumer = withStoreConsumer(Post);

const PostWithProvider = props => {
  return (
    <StoreProvider>
      <PostWithConsumer {...props} />
    </StoreProvider>
  );
};

PostWithProvider.getInitialProps = async request => {
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

export default PostWithProvider;
