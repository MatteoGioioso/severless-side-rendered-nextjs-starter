import SEO from "../components/SEO";
import Layout from "../components/Layout";
import BannerLanding from "../components/BannerLanding";
import Post from "../components/Posts/Post";
import React from "react";
import { colors } from "../components/Styled/vars";
import { contentfulClient } from "../services/Contentful";
import { registerServiceWorker } from "../services/helpers";
import { initGA, logPageView } from "../services/GoogleAnalytics";

class Index extends React.Component {
  componentDidMount() {
    registerServiceWorker();
    initGA();
    logPageView();
  }

  render() {
    const { posts } = this.props;

    return (
      <Layout>
        <SEO />
        <div style={{ backgroundColor: colors.whitebg }}>
          <BannerLanding />

          <div id="main">
            <section id="two" className="spotlights">
              {posts.map(post => (
                <Post key={post.id} {...post} imageUrl={post.imagesUrls[0]} />
              ))}
            </section>
          </div>
        </div>
      </Layout>
    );
  }
}

Index.getInitialProps = async ({ req }) => {
  const data = await contentfulClient.getEntries({
    content_type: "post",
    limit: 4
  });

  const posts = data.items.map(post => ({
    ...post.fields,
    id: post.sys.id,
    createdAt: post.sys.createdAt
  }));

  return {
    posts
  };
};

export default Index;
