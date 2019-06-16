import styled from "styled-components";
import SharingButtons from "./SharingButtons";
import { promptWebShare } from "../../services/helpers";
import React from "react";
import { FaShareAlt } from "react-icons/fa";

const WidgetContainer = styled.div`
  display: flex;
  padding: 15px;
`;

const BottomSharedWidget = ({ post }) => {
  return (
    <WidgetContainer>
      {promptWebShare().doesWebShareExist() ? (
        <FaShareAlt
          style={{ fontSize: "20px" }}
          onClick={promptWebShare().sharePost({
            title: post.title,
            description: post.summary,
            url: window.location.pathname
          })}
        />
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
        <FaShareAlt
          style={{ fontSize: "20px" }}
          onClick={promptWebShare().sharePost({
            title: post.title,
            description: post.summary,
            url: window.location.pathname
          })}
        />
      )}
    </WidgetContainer>
  );
};
