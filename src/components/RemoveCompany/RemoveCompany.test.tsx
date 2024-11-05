import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test/renderWithProviders";
import { RemoveCompany } from "./RemoveCompany";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test("Добавляет компанию в корзину", async () => {
  const user = userEvent.setup();
  const preloadedState = {
    cart: [],
  };
  const ticker = "A";
  const { store } = renderWithProviders(<RemoveCompany ticker={ticker} />, {
    preloadedState,
  });
  const button = screen.getByRole("button");
  await user.click(button);
  const updateState = store.getState();
  expect(updateState.cart.find((item) => item === ticker)).toBe("A");
});
