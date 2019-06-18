import React from "react";
import { colors } from "../Styled/vars";
import styled from "styled-components";
import { withStoreConsumer } from "../Store/Store";

const SkeletonContainer = styled.div`
  max-width: 850px;
  margin: auto;
  padding-top: 5%;
  padding-bottom: 5%;
  padding-left: 3%;
  padding-right: 3%;
`;

export const PostSkeleton = withStoreConsumer(
  ({ SkeletonTheme, Skeleton, themeName }) => {
    return (
      <SkeletonTheme
        color={themeName === "morning" || colors.accent1}
        highlightColor={themeName === "morning" || colors.accent2}
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
  }
);

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.bg};
  z-index: 1;
`;

const SubContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const Text = styled.h1`
  color: ${colors.bgalt};
  font-size: 18px;
`;

export const PostPageLoading = withStoreConsumer(({ themeName }) => {
  return (
    <LoadingContainer themeName={themeName}>
      <SubContainer>
        <Text themeName={themeName}>Loading...</Text>
      </SubContainer>
    </LoadingContainer>
  );
});
