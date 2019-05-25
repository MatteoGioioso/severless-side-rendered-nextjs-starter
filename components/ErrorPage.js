import React from "react";
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

const ErrorPage = ({ handleReportError, statusCode = 500 }) => {
  return (
    <Layout>
      <ErrorPageContainer>
        {statusCode === 404 ? (
          <h1>Moose not found!</h1>
        ) : (
          <h1>Sorry something went wrong =(</h1>
        )}
        {statusCode === 404 ? (
          <h5>You have gone too deep into the forest</h5>
        ) : (
          <h5>
            A team of untrained moose has been sent into the forest to
            investigate
          </h5>
        )}
        {statusCode === 404 || <p>Yes we keep our server there!</p>}
        {statusCode === 404 || (
          <button onClick={handleReportError}>Report feedback</button>
        )}
      </ErrorPageContainer>
    </Layout>
  );
};

export default ErrorPage;
