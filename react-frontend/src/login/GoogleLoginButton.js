import React from "react";
import PropTypes from "prop-types";
import GoogleLogin from "react-google-login";

const GoogleLoginButtonComponent = ({
  responseGoogleOnSuccess,
  responseGoogleOnFailure,
  buttonText,
}) => (
  <GoogleLogin
    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
    buttonText={buttonText}
    onSuccess={responseGoogleOnSuccess}
    onFailure={responseGoogleOnFailure}
    cookiePolicy={process.env.REACT_APP_GOOGLE_COOKIE_POLICY}
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

export default React.memo(GoogleLoginButtonComponent);
