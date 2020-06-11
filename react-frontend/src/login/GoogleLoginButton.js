import React from "react";
import PropTypes from "prop-types";
import GoogleLogin from "react-google-login";

import { GOOGLE_CLIENT_ID, GOOGLE_COOKIE_POLICY } from "constants/appConstants";

const GoogleLoginButtonComponent = ({
  responseGoogleOnSuccess,
  responseGoogleOnFailure,
  buttonText,
}) => (
  <GoogleLogin
    clientId={GOOGLE_CLIENT_ID}
    buttonText={buttonText}
    onSuccess={responseGoogleOnSuccess}
    onFailure={responseGoogleOnFailure}
    cookiePolicy={GOOGLE_COOKIE_POLICY}
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
