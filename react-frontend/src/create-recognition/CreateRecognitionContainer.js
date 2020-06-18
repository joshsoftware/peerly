import React from "react";

import CreateRecognition from "create-recognition/CreateRecognition";
const CreateRecognitionContainer = () => {
  const coreValues = [
    {
      id: 1,
      coreValueName: "core Value Name 1",
      coreValueImageSrc: "https://picsum.photos/id/237/200/300",
    },
    {
      id: 2,
      coreValueName: "core Value Name 2",
      coreValueImageSrc: "https://picsum.photos/id/237/200/300",
    },
    {
      id: 3,
      coreValueName: "core Value Name 3",
      coreValueImageSrc: "https://picsum.photos/id/237/200/300",
    },
    {
      id: 4,
      coreValueName: "core Value Name 4",
      coreValueImageSrc: "https://picsum.photos/id/237/200/300",
    },
  ];

  return (
    <CreateRecognition
      coreValues={coreValues}
      EmployeeImage="https://public-v2links.adobecc.com/b8bcaf62-377d-428f-41ee-f038352e2a2e/component?params=component_id%3Aa35c0de3-24d5-44c1-992c-59b8fc15f0d2&params=version%3A0&token=1592556550_da39a3ee_cf0656edd0c843bff08c7df820ff3f03b2ee011c&api_key=CometServer1"
      Hi5Image="https://public-v2links.adobecc.com/b8bcaf62-377d-428f-41ee-f038352e2a2e/component?params=component_id%3Aa1fd8594-6956-447e-91fa-99c68e40d839&params=version%3A0&token=1592556550_da39a3ee_cf0656edd0c843bff08c7df820ff3f03b2ee011c&api_key=CometServer1"
    />
  );
};

export default CreateRecognitionContainer;
