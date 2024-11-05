import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test/renderWithProviders";
import { CoefficientInput } from "./CoefficientInput";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test("в input можно ввести только цифры, при вводе цифр данные в Redux обновляются", async () => {
  const user = userEvent.setup();
  const preloadedState = {
    userData: {
      coefficients: {},
      moneyUser: 0,
      stocks: {},
    },
  };
  const { store } = renderWithProviders(<CoefficientInput ticker="BBBB" />, {
    preloadedState,
  });
  const input = screen.getByRole("textbox");
  expect(input).toHaveDisplayValue(/1/);
  await user.type(input, "100");
  expect(input).toHaveDisplayValue("1100");
  await user.type(input, "a");
  expect(input).toHaveDisplayValue("1100");
  const updateState = store.getState();
  expect(updateState.userData.coefficients.BBBB).toBe(1100);
});
