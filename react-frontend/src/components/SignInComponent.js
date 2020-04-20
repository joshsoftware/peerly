import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import DisplayDetailsComponent from "./DisplayDetailsComponent";
const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [nextpage, setNext] = useState(false);
  const [accesstoken, setToken] = useState("");
  const responseGoogle = (response) => {
    setName(response.profileObj.name);
    setEmail(response.profileObj.email);
    setUrl(response.profileObj.imageUrl);
    if (response.tokenObj.access_token !== undefined) {
      setNext(true);
      setToken(response.tokenObj.access_token);
    }
  };
  if (nextpage) {
    return (
      <DisplayDetailsComponent
        name={name}
        email={email}
        url={url}
        token={accesstoken}
      />
    );
  }
  return (
    <GoogleLogin
      clientId="270417110073-i9o1p7pf9isq4e9g2mrve1ofrvlaa7hh.apps.googleusercontent.com"
      buttonText="sign in with google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};
export default Login;
