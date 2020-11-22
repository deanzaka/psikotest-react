import React from "react";
import { Container } from "@material-ui/core";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";

const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <Container
        maxWidth="xs"
        style={{
          padding: 0,
          backgroundColor: "#FFFFFF",
          minHeight: "100vh",
          opacity: "0.3",
        }}
      >
        <Loader
          type="ThreeDots"
          color="#8E69EC"
          height="100"
          width="100"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </Container>
    )
  );
};

export default LoadingIndicator;
