import React from "react";
import styled from "styled-components";
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
import SharingButtons from "./SharingButtons";

const WidgetContainer = styled.div`
  position: fixed;
  left: 1%;
  top: 30%;
  z-index: 100;
  background-color: ${colors.whitebg};
  padding: 2%;
  border-radius: 5px;
`;

const ShareWidget = ({ url }) => {
  return (
    <WidgetContainer>
      <SharingButtons url={url}/>
    </WidgetContainer>
  );
};

export default ShareWidget;
