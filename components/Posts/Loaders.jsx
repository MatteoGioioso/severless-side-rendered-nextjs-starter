import React from "react";
import { colors } from "../Styled/vars";
import styled from "styled-components";

const SkeletonContainer = styled.div`
  max-width: 850px;
  margin: auto;
  padding-top: 5%;
  padding-bottom: 5%;
  padding-left: 3%;
  padding-right: 3%;
`;

export const PostSkeleton = ({ SkeletonTheme, Skeleton }) => {
  return (
    <SkeletonTheme
      // color={colors.skeleton}
      // highlightColor={colors.skeletonHighlight}
    >
      <SkeletonContainer>
        <Skeleton count={2} />
        <Skeleton count={1} height={150} />
      </SkeletonContainer>

      <SkeletonContainer>
        <Skeleton count={2} />
        <Skeleton count={1} height={150} />
      </SkeletonContainer>
    </SkeletonTheme>
  );
};

export const PostPageLoading = ({}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.bg,
        zIndex: "1"
      }}
    >
      <div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center"
        }}
      >
        <h1 style={{ color: colors.bgalt, fontSize: "18px" }}>Loading...</h1>
      </div>
    </div>
  );
};
