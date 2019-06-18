import styled from "styled-components";
import SharingButtons from "./SharingButtons";
import { promptWebShare } from "../../services/helpers";
import React, { useState } from "react";
import { FaShareAlt, FaSpinner } from "react-icons/fa";

const WidgetContainer = styled.div`
  display: flex;
  padding: 15px;
`;

const BottomSharedWidget = ({ post }) => {
  return (
    <WidgetContainer>
      {promptWebShare().doesWebShareExist() ? (
        <WebShareButton post={post} />
      ) : (
        <SharingButtons url={post.url} />
      )}
    </WidgetContainer>
  );
};

export default BottomSharedWidget;

export const TopShareWidget = ({ post }) => {
  return (
    <WidgetContainer>
      {promptWebShare().doesWebShareExist() && (
        <WebShareButton post={post} />
      )}
    </WidgetContainer>
  );
};

const Spinner = styled(FaSpinner)`
  animation: infinite-spinning 2s infinite;
  
  @keyframes infinite-spinning {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const WebShareButton = ({ post }) => {
  const [isLoading, setIsLoading] = useState(false);
  const shareOptions = {
    title: post.title,
    description: post.summary,
    url: window.location.pathname
  };

  function handleShareClick() {
    setIsLoading(true);
    promptWebShare().sharePost(shareOptions, () => setIsLoading(false));
  }

  return isLoading ? (
    <Spinner style={{ fontSize: "20px" }} />
  ) : (
    <FaShareAlt style={{ fontSize: "20px" }} onClick={handleShareClick} />
  );
};
