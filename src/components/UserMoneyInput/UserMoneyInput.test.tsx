import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../redux/test/renderWithProviders";
import { UserMoneyInput } from "./UserMoneyInput";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

test("Пользователь вводи значение в инпут", async () => {
  const user = userEvent.setup();
  const preloadedState = {
    userData: {
      coefficients: {},
      moneyUser: 0,
      stocks: {},
    },
  };
  const { store } = renderWithProviders(<UserMoneyInput />, { preloadedState });
  const input = screen.getByRole("textbox");
  await user.type(input, "100000");
  expect(input).toHaveDisplayValue("100 000");
  const updateState = store.getState();
	expect(updateState.userData.moneyUser).toBe(100000)
});
