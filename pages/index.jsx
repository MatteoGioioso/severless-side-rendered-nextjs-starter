import SEO from "../components/SEO";
import Layout from "../components/Layout";
import BannerLanding from "../components/BannerLanding";
import Post from "../components/Posts/Post";
import React from "react";
import { contentfulClient } from "../services/Contentful";
import dynamic from "next/dynamic";
import { PostSkeleton } from "../components/Posts/Loaders";
import styled from "styled-components";
import { withStoreConsumer } from "../components/Store/Store";

const Container = styled.div`
  background-color: ${props =>
    props.theme[props.themeName].backgroundColor} !important;
  color: ${props => props.theme[props.themeName].textColor} !important;
`;

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      isLoading: false
    };

    this.Skeleton = null;
    this.SkeletonTheme = null;

    this.importDynamicComponents = this.importDynamicComponents.bind(this);
  }

  importDynamicComponents() {
    this.Skeleton = dynamic(() => import("react-loading-skeleton"));

    this.SkeletonTheme = dynamic(() =>
      import("react-loading-skeleton").then(mod => mod.SkeletonTheme)
    );
  }

  static transformDataToPosts(data) {
    return data.items.map(post => ({
      ...post.fields,
      id: post.sys.id,
      createdAt: post.sys.createdAt
    }));
  }

  static async getPosts() {
    try {
      const data = await contentfulClient.getEntries({
        content_type: "post"
      });

      return Index.transformDataToPosts(data);
    } catch (e) {
      console.log(e);
    }
  }

  async componentDidMount() {
    this.importDynamicComponents();

    this.setState({ isLoading: true });

    const posts = await Index.getPosts();

    setTimeout(() => {
      this.setState({ posts, isLoading: false });
    }, 800);
  }

  render() {
    const { posts, isLoading } = this.state;

    return (
      <Layout>
        <SEO />

        {/* <BannerLanding /> */}

        <Container id="main" themeName={this.props.themeName}>
          <section id="two" className="spotlights posts-thumbnail-container">
            {posts.map(post => (
              <Post
                key={post.id}
                {...post}
                imageUrl={post.imagesUrls[0]}
                themeName={this.props.themeName}
              />
            ))}
            {isLoading && (
              <PostSkeleton
                SkeletonTheme={this.SkeletonTheme}
                Skeleton={this.Skeleton}
              />
            )}
          </section>
        </Container>
      </Layout>
    );
  }
}

export default withStoreConsumer(Index);
