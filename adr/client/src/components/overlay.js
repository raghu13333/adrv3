import React from "react";
import PropTypes from "prop-types";
import LoadingOverlay from "react-loading-overlay";
import LoadingSpinner from "./LoadingSpinner.js";

const Overlay = props => (
  <LoadingOverlay
    {...props}
    spinner={<LoadingSpinner />}
    styles={{
      overlay: base => ({
        ...base,
        background: "rgba(255, 255, 255, 0.7)"
      }),
      content: base => ({
        ...base,
        marginTop: props.marginTop
      })
    }}
  >
    {props.children}
  </LoadingOverlay>
);

Overlay.propTypes = {
  loading: PropTypes.bool
};

export default Overlay;