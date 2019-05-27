import React from "react";
import { colors } from "../Styled/vars";
import styled, { css } from "styled-components";
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

const iconStyle = css`
  cursor: pointer;
  transition: all 150ms ease-in-out;
  &:hover {
    transform: scale(0.75);
  }
`;

const FacebookIconStyled = styled(FacebookIcon)`
  ${iconStyle}
`;
const TwitterIconStyled = styled(TwitterIcon)`
  ${iconStyle}
`;
const RedditIconStyled = styled(RedditIcon)`
  ${iconStyle}
`;
const LinkedinIconStyled = styled(LinkedinIcon)`
  ${iconStyle}
`;
const WhatsappIconStyled = styled(WhatsappIcon)`
  ${iconStyle}
`;
const EmailIconStyled = styled(EmailIcon)`
  ${iconStyle}
`;

const SharingButtons = ({ url }) => {
  return (
    <>
      <FacebookShareButton url={url}>
        <FacebookIconStyled
          size={40}
          iconBgStyle={{ fill: colors.whitebg }}
          logoFillColor={"rgba(0,0,0,.76)"}
        />
      </FacebookShareButton>

      <RedditShareButton url={url}>
        <RedditIconStyled
          size={40}
          iconBgStyle={{ fill: colors.whitebg }}
          logoFillColor={"rgba(0,0,0,.76)"}
        />
      </RedditShareButton>

      <TwitterShareButton url={url}>
        <TwitterIconStyled
          size={40}
          iconBgStyle={{ fill: colors.whitebg }}
          logoFillColor={"rgba(0,0,0,.76)"}
        />
      </TwitterShareButton>

      <LinkedinShareButton url={url}>
        <LinkedinIconStyled
          size={40}
          iconBgStyle={{ fill: colors.whitebg }}
          logoFillColor={"rgba(0,0,0,.76)"}
        />
      </LinkedinShareButton>

      <WhatsappShareButton url={url}>
        <WhatsappIconStyled
          size={40}
          iconBgStyle={{ fill: colors.whitebg }}
          logoFillColor={"rgba(0,0,0,.76)"}
        />
      </WhatsappShareButton>

      <EmailShareButton url={url}>
        <EmailIconStyled
          size={40}
          iconBgStyle={{ fill: colors.whitebg }}
          logoFillColor={"rgba(0,0,0,.76)"}
        />
      </EmailShareButton>
    </>
  );
};

export default SharingButtons;
