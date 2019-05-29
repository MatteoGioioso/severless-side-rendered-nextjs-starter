import React from "react";
import { colors } from "../Styled/vars";

export const PostSkeleton = ({ SkeletonTheme, Skeleton }) => {
  return (
    <SkeletonTheme
      color={colors.skeleton}
      highlightColor={colors.skeletonHighlight}
    >
      <div
        style={{
          maxWidth: "850px",
          margin: "auto",
          paddingTop: "5%",
          paddingBottom: "5%"
        }}
      >
        <Skeleton count={2} />
        <Skeleton count={1} height={150} />
      </div>

      <div
        style={{
          maxWidth: "850px",
          margin: "auto",
          paddingBottom: "5%"
        }}
      >
        <Skeleton count={2} />
        <Skeleton count={1} height={150} />
      </div>
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
