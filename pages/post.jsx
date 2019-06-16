import Layout from "../components/Layout";
import { contentfulClient } from "../services/Contentful";
import SEO from "../components/SEO";
import React from "react";
import { isMobile } from "../services/helpers";
import ShareWidget from "../components/Posts/ShareWidget";
import { ThemeProvider } from "styled-components";
import TitleBanner from "../components/Post/TitleBanner";
import Content from "../components/Post/Content";
import { colors } from "../components/Styled/vars";

const theme = {
  morning: {
    backgroundColor: colors.whitebg,
    textColor: colors.bgalt
  },
  night: {
    backgroundColor: colors.bgalt,
    textColor: colors.whitebg
  }
};

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobile: false,
      bottomWidget: false,
      articleStart: true,
      themeName: "morning"
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
        cache.addAll([`/post/${this.props.postId}`]);
      });
    }
  }

  componentDidMount() {
    this.setState({ isMobile: isMobile() });
    this.cachePost();
  }

  handleThemeChange() {
    this.setState(prevState => {
      const nextState = prevState.themeName === "morning" ? "night" : "morning";
      return {themeName: nextState}
    })
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
      <ThemeProvider theme={theme}>
        <Layout themeName={this.state.themeName}>
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
            themeName={this.state.themeName}
            handleThemeChange={this.handleThemeChange}
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
            themeName={this.state.themeName}
          />

          {!this.state.isMobile && renderSharingWidget()}
        </Layout>
      </ThemeProvider>
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
