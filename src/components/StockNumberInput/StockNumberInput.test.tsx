import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../redux/test/renderWithProviders";
import { StockNumberInput } from "./StockNumberInput";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UserData } from "../../redux/userDataSlice/userDataSlice.js";

describe("component StockNumberInput", () => {
  it("в input можно ввести только цифры, при вводе цифр данные в Redux обновляются", async () => {
    const user = userEvent.setup();
    const preloadedState = {
      userData: {
        coefficients: {},
        moneyUser: 0,
        stocks: {},
      } as unknown as UserData,
    };
    const { store } = renderWithProviders(<StockNumberInput ticker="AAAA" />, {
      preloadedState,
    });
    const input = screen.getByRole("textbox");
    expect(input).toHaveDisplayValue(/0/);
    await user.type(input, "23");
    expect(input).toHaveDisplayValue(/23/);
    await user.type(input, "abc");
    expect(input).toHaveDisplayValue(/23/);
    const updateState = store.getState();
    expect(updateState.userData.stocks.AAAA).toBe(23);
  });
});
