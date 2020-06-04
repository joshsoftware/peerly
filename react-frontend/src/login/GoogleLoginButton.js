import React from "react";
import PropTypes from "prop-types";
import GoogleLogin from "react-google-login";

const GoogleLoginButtonComponent = ({
  responseGoogleOnSuccess,
  responseGoogleOnFailure,
  buttonText,
}) => (
  <GoogleLogin
    clientId="907716014506-306rlfo0dobiib8ee07870g1ct66910d.apps.googleusercontent.com"
    buttonText={buttonText}
    onSuccess={responseGoogleOnSuccess}
    onFailure={responseGoogleOnFailure}
    cookiePolicy={"single_host_origin"}
  />
);

GoogleLoginButtonComponent.defaultProps = {
  buttonText: "Sign in with google",
};

GoogleLoginButtonComponent.propTypes = {
  responseGoogleOnSuccess: PropTypes.func.isRequired,
  responseGoogleOnFailure: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
};

export default GoogleLoginButtonComponent;
