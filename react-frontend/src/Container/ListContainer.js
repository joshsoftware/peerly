import React from "react";
import GivenComponent from "components/GivenComponent";
const ListContainer = () => {
  const list = ["Avinash Mane", "Jitendra", "Omkar", "Manish", "Subhajit"];
  //   const recognisations = [
  //     "Recognization1","Recognization2","Recognization3","Recognization4","Recognization5"]
  // const Badges = ["Badge1","Badge2","Badge3"]
  return <GivenComponent list={list} />;
};
export default ListContainer;
