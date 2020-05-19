import React from "react";
import { render } from "@testing-library/react";

import NotificationBadgeComponent from "core-components/notification/NotificationBadgeComponent";

describe("Show count in notification test", () => {
  test("renders count notification ", () => {
    const { getByTestId, rerender } = render(
      <NotificationBadgeComponent count={2} />
    );
    expect(getByTestId("count-display").textContent).toBe("2");
    rerender(<NotificationBadgeComponent count={1} />);
    expect(getByTestId("count-display").textContent).toBe("1");
  });
});
