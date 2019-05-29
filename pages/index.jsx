import SEO from "../components/SEO";
import Layout from "../components/Layout";
import BannerLanding from "../components/BannerLanding";
import Post from "../components/Posts/Post";
import React from "react";
import { colors } from "../components/Styled/vars";
import { contentfulClient } from "../services/Contentful";
import {
  registerServiceWorker,
  checkForServiceWorkerUpdate
} from "../services/helpers";
import { initGA, logPageView } from "../services/GoogleAnalytics";
import dynamic from "next/dynamic";
import { PostSkeleton } from "../components/Posts/Loaders";

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      isLoading: false,
      isNotificationOpen: false
    };

    this.Skeleton = null;
    this.SkeletonTheme = null;
    this.worker = null;

    this.getPosts = this.getPosts.bind(this);
    this.handleNotificationClick = this.handleNotificationClick.bind(this);
    this.importDyanamicComponents = this.importDyanamicComponents.bind(this);
  }

  importDyanamicComponents() {
    this.Skeleton = dynamic(() => import("react-loading-skeleton"));

    this.SkeletonTheme = dynamic(() =>
      import("react-loading-skeleton").then(mod => mod.SkeletonTheme)
    );
  }

  handleNotificationClick() {
    this.worker.postMessage({ action: "skipWaiting" });
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

    setTimeout(() => {
      this.setState({ posts, isLoading: false });
    }, 1000);
  }

  componentDidMount() {
    registerServiceWorker(reg => {
      reg.addEventListener(
        "updatefound",
        checkForServiceWorkerUpdate(this, reg)
      );
    });

    navigator.serviceWorker.addEventListener("controllerchange", function() {
      window.location.reload();
    });

    this.importDyanamicComponents();
    initGA();
    logPageView();
    this.getPosts();
  }

  render() {
    const { posts, isLoading, isNotificationOpen } = this.state;

    return (
      <Layout
        isNotificationOpen={this.state.isNotificationOpen}
        handleNotificationClick={this.handleNotificationClick}
      >
        <SEO />
        <div style={{ backgroundColor: colors.whitebg }}>
          <BannerLanding />

          <div id="main">
            <section id="two" className="spotlights posts-thumbnail-container">
              {posts.map(post => (
                <Post key={post.id} {...post} imageUrl={post.imagesUrls[0]} />
              ))}
              {isLoading && (
                <PostSkeleton
                  SkeletonTheme={this.SkeletonTheme}
                  Skeleton={this.Skeleton}
                />
              )}
            </section>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Index;
