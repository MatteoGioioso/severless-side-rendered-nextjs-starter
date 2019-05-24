import React from "react";
import { colors } from "../Styled/vars";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton
} from "react-share";

import {
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
  RedditIcon,
  EmailIcon
} from "react-share";

const SharingButtons = ({ url }) => {
  return (
    <>
      <FacebookShareButton url={url}>
        <FacebookIcon
          size={40}
          iconBgStyle={{ fill: colors.whitebg }}
          logoFillColor={"rgba(0,0,0,.76)"}
        />
      </FacebookShareButton>

      <RedditShareButton url={url}>
        <RedditIcon
          size={40}
          iconBgStyle={{ fill: colors.whitebg }}
          logoFillColor={"rgba(0,0,0,.76)"}
        />
      </RedditShareButton>

      <TwitterShareButton url={url}>
        <TwitterIcon
          size={40}
          iconBgStyle={{ fill: colors.whitebg }}
          logoFillColor={"rgba(0,0,0,.76)"}
        />
      </TwitterShareButton>

      <LinkedinShareButton url={url}>
        <LinkedinIcon
          size={40}
          iconBgStyle={{ fill: colors.whitebg }}
          logoFillColor={"rgba(0,0,0,.76)"}
        />
      </LinkedinShareButton>

      <WhatsappShareButton url={url}>
        <WhatsappIcon
          size={40}
          iconBgStyle={{ fill: colors.whitebg }}
          logoFillColor={"rgba(0,0,0,.76)"}
        />
      </WhatsappShareButton>

      <EmailShareButton url={url}>
        <EmailIcon
          size={40}
          iconBgStyle={{ fill: colors.whitebg }}
          logoFillColor={"rgba(0,0,0,.76)"}
        />
      </EmailShareButton>
    </>
  );
};

export default SharingButtons