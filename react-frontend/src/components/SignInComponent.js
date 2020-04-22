import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import DisplayDetailsComponent from "components/DisplayDetailsComponent";
const Login = () => {
  //console.log(process.env.REACT_APP_CLIENTID);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [nextpage, setNext] = useState(false);
  const [accesstoken, setToken] = useState("");
  const responseGoogle = (response) => {
    setName(response.profileObj.name);
    setEmail(response.profileObj.email);
    setUrl(response.profileObj.imageUrl);
    //console.log(response);
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
    <div>
      <GoogleLogin
        class="btn btn-block btn-social btn-google"
        clientId={process.env.REACT_APP_GOOGLECLIENTID} // eslint-disable-line no-unused-vars
        buttonText="sign in with google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};
export default Login;
