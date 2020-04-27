import React from "react";
import ListRecognitionComponent from "components/listRecognitionsComponent";

const ListRecognitionsContainer = () => {
  function recognitionListData() {
    const list = [
      {
        hi5_quota_balance: "25",
        name: "avinash Mane",
        recognistion_on: "1587957150",
        recognistion_text:
          "recognition text:welcome to bonusly @sahil+bonasuly ! we are recognistion you with +25",
        core_value_text: "welcome to peerly",
      },
      {
        hi5_quota_balance: "2",
        name: "jitu bunde",
        recognistion_on: "1587959983",
        recognistion_text:
          "recognition text:welcome to bonusly @sahil+bonasuly ! we are recognistion you with +25",
        core_value_text: "welcome to peerly",
      },
      {
        hi5_quota_balance: "3",
        name: "data ",
        recognistion_on: "1587726988",
        recognistion_text:
          "recognition text:welcome to bonusly @sahil+bonasuly ! we are recognistion you with +25",
        core_value_text: "welcome to peerly",
      },
    ];
    return list;
  }
  return <ListRecognitionComponent list={recognitionListData()} />;
};
export default ListRecognitionsContainer;
