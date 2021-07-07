import React from "react";
import { render } from "@testing-library/react";

import FilterRecognitionCard from "filter-recognition/FilterRecognitionCard";
import ProfileComponent from "shared-components/profile-component/ProfileComponent.js";

describe("FilterRecognitionCard component test", () => {
  const list = [
    {
      label: <ProfileComponent text="Jitendra Bunde" />,
      value: {
        id: 1,
        text: "Jitendra Bunde",
      },
    },
  ];

  const promiseOptionfunction = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(list);
      }, 1000);
    });
  };

  const onSubmit = () => {
    return true;
  };

  test("should render FilterRecognitionCard component", () => {
    const { asFragment } = render(
      <FilterRecognitionCard
        coreValueList={list}
        promiseCoreValueOptions={promiseOptionfunction}
        givenForList={list}
        promiseGivenForOptions={promiseOptionfunction}
        givenByList={list}
        promiseGivenByOptions={promiseOptionfunction}
        onSubmit={onSubmit}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
