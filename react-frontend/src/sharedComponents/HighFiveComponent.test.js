import renderWithRouter from "helpers/test-helpers/routeHelper";
import HignFiveComponent from "./HignFiveComponent";

describe("Image component test", () => {
  test("renders image component with image", () => {
    const { getByAltText } = renderWithRouter(HignFiveComponent);
    const testImage = getByAltText("High five recognition");
    expect(testImage).toBeInTheDocument();
  });
});
