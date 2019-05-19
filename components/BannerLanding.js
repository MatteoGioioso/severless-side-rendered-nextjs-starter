import { colors } from "./Styled/vars";

const BannerLanding = props => (
  <section id="banner" className="style2">
    <div className="inner">
      <header className="major">
        <h1 style={{ fontWeight: "100" }}>Hirvitek blog</h1>
      </header>
      <div className="content">
        <p style={{ color: colors.whitebg_2 }}>
          Hello and welcome to this tech blog. In
          this blog you will find niche technical articles in the world of
          software development.
        </p>
      </div>
    </div>
  </section>
);

export default BannerLanding;
