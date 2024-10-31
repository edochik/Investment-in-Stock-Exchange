import { InitialData } from "../../redux/initialDataSlice/initialDataSlice";
import { renderWithProviders } from "../../redux/test/renderWithProviders";
import { UserData } from "../../redux/userDataSlice/userDataSlice.js";
import { Table } from "./Table";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

test("Отображение компаний, пользователь нажимает на кнопку положить в корзину, компания не отображается и находится в корзине", async () => {
  const user = userEvent.setup();
  const preloadedState = {
    data: {
      data: {
        imoex: [
          { ticker: "a", shortname: "Компания A", weight: 10 },
          { ticker: "b", shortname: "Компания B", weight: 60 },
        ],
        securities: {
          a: {
            secid: "a",
            shortname: "Компания A",
            prevprice: 25,
          },
          b: {
            secid: "b",
            shortname: "Компания B",
            prevprice: 75,
          },
          c: {
            secid: "c",
            shortname: "Компания C",
            prevprice: 100,
          },
        },
      },
    } as unknown as InitialData,
    userData: {
      coefficients: {},
      moneyUser: 0,
      stocks: {},
    } as unknown as UserData,
    nonImoex: [{ ticker: "c", shortname: "Компания C", weight: 30 }],
    cart: [],
  };
  const { store } = renderWithProviders(<Table />, { preloadedState });
  //!проверяем что компании отображаются из списка imoex или nonImoex
  expect(screen.getByText("Компания A")).toBeInTheDocument();
  expect(screen.getByText("Компания C")).toBeInTheDocument();
  //!Пользователь нажимает на кнопку в корзину, компания C убирается в корзину
  await user.click(screen.getByTestId("ticker-c"));
  const updateState = store.getState();
  expect(updateState.cart.find((item) => item === "c")).toBe("c");
  expect(screen.queryByText("Компания C")).not.toBeInTheDocument();

  const inputs = screen.queryAllByRole("textbox");
  //!Пользователь вводит значение в первый input
  await user.type(inputs[0], "111");
  expect(screen.getByText("2775")).toBeInTheDocument();
  //!Пользователь вводит значение во второй input
  await user.type(inputs[1], "3");
  expect(inputs[1]).toHaveDisplayValue("13");
  //!Проверка сортировки
  const sortButton = screen.getByRole("button", { name: "Название компании" });
  await user.click(sortButton);
  const list = screen
    .getAllByTestId(/ticker-/)
    .map((element) => element.getAttribute("data-testid"));
  expect(list).toStrictEqual(["ticker-b", "ticker-a"]);
  await user.click(sortButton);
  const newList = screen
    .getAllByTestId(/ticker-/)
    .map((element) => element.getAttribute("data-testid"));
  expect(newList).toStrictEqual(["ticker-a", "ticker-b"]);
});
