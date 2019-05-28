import SEO from "../components/SEO";
import Layout from "../components/Layout";
import BannerLanding from "../components/BannerLanding";
import Post from "../components/Posts/Post";
import React from "react";
import { colors } from "../components/Styled/vars";
import { contentfulClient } from "../services/Contentful";
import { registerServiceWorker } from "../services/helpers";
import { initGA, logPageView } from "../services/GoogleAnalytics";
import dynamic from "next/dynamic";

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      isLoading: false
    };
    this.Skeleton = null;
    this.SkeletonTheme = null;
    this.getPosts = this.getPosts.bind(this);
  }

  async getPosts() {
    this.setState({ isLoading: true });
    const data = await contentfulClient.getEntries({
      content_type: "post",
      limit: 4
    });

    const posts = data.items.map(post => ({
      ...post.fields,
      id: post.sys.id,
      createdAt: post.sys.createdAt
    }));

    this.setState({ posts, isLoading: true });
  }

  componentDidMount() {
    registerServiceWorker();

    this.Skeleton = dynamic(() => import("react-loading-skeleton"));

    this.SkeletonTheme = dynamic(() =>
      import("react-loading-skeleton").then(mod => mod.SkeletonTheme)
    );

    initGA();
    logPageView();
    this.getPosts();
  }

  render() {
    const { posts, isLoading } = this.state;

    return (
      <Layout>
        <SEO />
        <div style={{ backgroundColor: colors.whitebg }}>
          <BannerLanding />

          <div id="main">
            <section id="two" className="spotlights posts-thumbnail-container">
              {posts.map(post => (
                <Post key={post.id} {...post} imageUrl={post.imagesUrls[0]} />
              ))}
              {isLoading && (
                <div
                  style={{
                    maxWidth: "850px",
                    margin: "auto",
                    paddingBottom: "2%"
                  }}
                >
                  <this.SkeletonTheme color={colors.skeleton} highlightColor={colors.skeletonHighlight}>
                    <this.Skeleton count={1} height={150} />
                  </this.SkeletonTheme>
                </div>
              )}
            </section>
          </div>
        </div>
      </Layout>
    );
  }
}

// Index.getInitialProps = async ({ req }) => {
//   // const data = await contentfulClient.getEntries({
//   //   content_type: "post",
//   //   limit: 4
//   // });

//   // const posts = data.items.map(post => ({
//   //   ...post.fields,
//   //   id: post.sys.id,
//   //   createdAt: post.sys.createdAt
//   // }));

//   return {
//     // posts
//   };
// };

export default Index;
