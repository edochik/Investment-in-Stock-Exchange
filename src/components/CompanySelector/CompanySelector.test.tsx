import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test/renderWithProviders";
import { CompanySelector } from "./CompanySelector";
import { InitialData } from "../../redux/initialDataSlice/initialDataSlice";
import { screen } from "@testing-library/react";

import "@testing-library/jest-dom";

describe("Тест component CompanySelector", () => {
  test("Добавление компании в nonImoex", async () => {
    const user = userEvent.setup();
    const preloadedState = {
      data: {
        data: {
          imoex: [{ ticker: "red" }],
          securities: {
            red: {
              secid: "red",
            },
            green: {
              secid: "green",
            },
            blue: {
              secid: "blue",
            },
          },
        },
      } as unknown as InitialData,
    };
    const { store } = renderWithProviders(<CompanySelector />, {
      preloadedState,
    });
    const listItems = screen.getAllByRole("listitem");
    expect(screen.queryByText(/red/)).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Добавить компанию" })
    ).toHaveAttribute("disabled");
    await user.click(listItems[0]);
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
    const inputWeight = screen.getByRole("textbox", {
      name: /Введите вес компании:/,
    });
    await user.type(inputWeight, "100");
    await user.type(inputWeight, "abc");
    expect(screen.queryByText(/abc/)).not.toBeInTheDocument();
    const buttonAdd = screen.queryByRole("button", {
      name: /Добавить компанию/,
    });
    await user.click(buttonAdd!);
    expect(
      screen.getByRole("button", { name: /Добавить компанию/ })
    ).toHaveAttribute("disabled");
    expect(screen.getByText(/blue/)).toBeInTheDocument();
    const updateState = store.getState();
    expect(updateState.nonImoex[0].ticker).toBe("green");
  });
});
