import React from 'react';
import Layout from "./Layout";
import styled from "styled-components";

const ErrorPageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 5%;
`;

const ErrorPage = ({handleReportError}) => {
  return (
    <Layout>
      <ErrorPageContainer>
        <h1>Sorry something went wrong =(</h1>
        <h5>
          A team of untrained moose has been sent into the forest to
          investigate
        </h5>
        <p>Yes we keep our server there!</p>
        <button
          onClick={handleReportError}
        >
          Report feedback
        </button>
      </ErrorPageContainer>
    </Layout>
  );
};

export default ErrorPage;
