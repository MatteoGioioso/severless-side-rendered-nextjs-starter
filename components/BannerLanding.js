import { colors } from "./Styled/vars";
import React from "react";
import HirvitekHead from "./HirvitekHead";

const defaultTitle = "Hirvitek / blog";
const defaultDescription = "The blog of brilliant ideas.";

const BannerLanding = props => (
  <section id="banner" className="style2">
    <div className="inner" >
      <header className="major">
        <h1 style={{ fontWeight: "100", color: colors.whitebg, textTransform: 'uppercase' }}>

          {props.title || defaultTitle}
          <HirvitekHead/>
        </h1>
      </header>

      <div className="content">
        <p style={{ color: colors.whitebg_2 }}>
          {props.summary || defaultDescription}
        </p>
      </div>
    </div>
  </section>
);

export default BannerLanding;
