import React from "react";
import { Alert } from "react-bootstrap";

const HomeComponent = () => {
  return (
    <Alert variant="secondary">
      <Alert.Heading>
        <h2>
          <b>Hey, nice to see you</b>
        </h2>
      </Alert.Heading>
      <hr />
      <Alert.Heading>
        <h3>
          <u>The Peer Rewards and Recognition System</u>
        </h3>
      </Alert.Heading>
      <hr />
      <br></br>
      <p className="text-left">
        Peerly is peer-recognition and rewarding system! Every employee gets and
        gives high-5 (henceforth called hi5) Give a hi5 to someone who you want
        to appreciate for something they did. Every week you get 2 hi5 that you
        can give to others use it or lose it.
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </p>
      <br></br>
      <br></br>
    </Alert>
  );
};
export default HomeComponent;
