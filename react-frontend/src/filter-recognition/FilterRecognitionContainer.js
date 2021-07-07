import React from "react";

import FilterRecognitionComponent from "filter-recognition/FilterRecognitionComponent";
import ProfileComponent from "shared-components/profile-component/ProfileComponent";

const FilterRecognitionContainer = () => {
  const coreValue = [
    {
      value: 1,
      label: <ProfileComponent text="Jitendra Bunde" />,
    },
  ];

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const promiseCoreValueOptions = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(coreValue);
      }, 1000);
    });

  return (
    <div>
      <FilterRecognitionComponent
        onSubmit={onSubmit}
        coreValueList={coreValue}
        promiseCoreValueOptions={promiseCoreValueOptions}
      />
    </div>
  );
};
export default FilterRecognitionContainer;
