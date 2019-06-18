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
import { withStoreConsumer } from "../Store/Store";

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

const getStyleByThemName = themeName => {
  const isMorningTheme = () => themeName === "morning";

  return {
    iconBgStyle: isMorningTheme() ? colors.whitebg : colors.bgalt,
    logoFillColor: isMorningTheme() ? "rgba(0,0,0,.76)" : colors.whitebg
  };
};

const SharingButtons = ({ themeName }) => {
  const url = "https://blog.hirvitek.com/" + window.location.pathname;
  const styles = getStyleByThemName(themeName);
  return (
    <>
      <FacebookShareButton url={url}>
        <FacebookIconStyled
          size={40}
          iconBgStyle={{ fill: styles.iconBgStyle }}
          logoFillColor={styles.logoFillColor}
        />
      </FacebookShareButton>

      <RedditShareButton url={url}>
        <RedditIconStyled
          size={40}
          iconBgStyle={{ fill: styles.iconBgStyle }}
          logoFillColor={styles.logoFillColor}
        />
      </RedditShareButton>

      <TwitterShareButton url={url}>
        <TwitterIconStyled
          size={40}
          iconBgStyle={{ fill: styles.iconBgStyle }}
          logoFillColor={styles.logoFillColor}
        />
      </TwitterShareButton>

      <LinkedinShareButton url={url}>
        <LinkedinIconStyled
          size={40}
          iconBgStyle={{ fill: styles.iconBgStyle }}
          logoFillColor={styles.logoFillColor}
        />
      </LinkedinShareButton>

      <WhatsappShareButton url={url}>
        <WhatsappIconStyled
          size={40}
          iconBgStyle={{ fill: styles.iconBgStyle }}
          logoFillColor={styles.logoFillColor}
        />
      </WhatsappShareButton>

      <EmailShareButton url={url}>
        <EmailIconStyled
          size={40}
          iconBgStyle={{ fill: styles.iconBgStyle }}
          logoFillColor={styles.logoFillColor}
        />
      </EmailShareButton>
    </>
  );
};

export default withStoreConsumer(SharingButtons);
