import App from "./App";
import renderWithRouter from "helpers/test-helpers/RouteHelper";

test("renders basic app with dashboard link", () => {
  const { getByText } = renderWithRouter(App);
  const linkElement = getByText(/dashboard/i);
  expect(linkElement).toBeInTheDocument();
});
