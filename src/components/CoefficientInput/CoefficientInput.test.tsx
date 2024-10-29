import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../redux/test/renderWithProviders";
import { CoefficientInput } from "./CoefficientInput";
import { UserData } from "../../redux/userDataSlice/userDataSlice";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("component CoefficientInput", () => {
  it("в input можно ввести только цифры, при вводе цифр данные в Redux обновляются", async () => {
    const user = userEvent.setup();
    const preloadedState = {
      userData: {
        coefficients: {},
        moneyUser: 0,
        stocks: {},
      } as unknown as UserData,
    };
    const { store } = renderWithProviders(<CoefficientInput ticker="BBBB" />, {
      preloadedState,
    });
    const input = screen.getByRole("textbox");
    expect(input).toHaveDisplayValue(/1/);
    await user.type(input, "100");
    expect(input).toHaveDisplayValue("1100");
    await user.type(input, "abc");
    expect(input).toHaveDisplayValue("1100");
    const updateState = store.getState();
    expect(updateState.userData.coefficients.BBBB).toBe(1100);
  });
});
