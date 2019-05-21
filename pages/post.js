import { colors } from "../components/Styled/vars";
import Layout from "../components/Layout";
import { contentfulClient } from "../services/Contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import SEO from "../components/SEO";
import BannerLanding from "../components/BannerLanding";

const Post = ({ post, postId }) => {
  return (
    <Layout>
      <SEO
        seoConfig={{
          title: post.title,
          description: post.summary,
          url: postId
        }}
      />
      <BannerLanding
        imageUrl={post.imagesUrls[0]}
        summary={post.summary}
        title={post.title}
      />

      <div id="main" className="alt">
        <section id="one">
          <div className="inner">
            <span className="image main">
              <img src={post.imagesUrls[0]} alt="" />
            </span>
            <div
              dangerouslySetInnerHTML={{
                __html: documentToHtmlString(post.content)
              }}
            />
          </div>
        </section>
      </div>
    </Layout>
  );
};

Post.getInitialProps = async ({ req }) => {
  const { postId } = req.params;

  const id = postId.split("_")[1];

  const data = await contentfulClient.getEntry(id);

  return {
    post: data.fields,
    postId
  };
};

export default Post;
