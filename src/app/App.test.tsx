import { renderWithProviders } from "../redux/test/renderWithProviders";
import { screen } from "@testing-library/react";
import App from "./App";
import { InitialData } from "../redux/initialDataSlice/initialDataSlice.js";
import "@testing-library/jest-dom";

describe("тестирование App", () => {
  it("Данные отсутствуют", () => {
    const preloadedState = {
      data: {
        loading: "idle",
        error: null,
        data: null,
      } as unknown as InitialData,
    };
    renderWithProviders(<App />, { preloadedState });
    expect(screen.getByText(/нет подключения/)).toBeInTheDocument();
  });
  it("Данные загружаются", () => {
    const preloadedState = {
      data: {
        loading: "pending",
        error: null,
        data: {
          imoex: [],
          securities: {},
          updatedAt: null,
          isFresh: true,
        },
      } as unknown as InitialData,
    };
    renderWithProviders(<App />, { preloadedState });
    expect(screen.getByText(/загрузка/)).toBeInTheDocument();
  });
  it("Данные не обновлены", () => {
    const preloadedState = {
      data: {
        loading: "succeeded",
        error: null,
        data: {
          imoex: [],
          securities: {},
          updatedAt: null,
          isFresh: false,
        },
      } as unknown as InitialData,
    };
    renderWithProviders(<App />, { preloadedState });
    expect(screen.getByText(/Информация загружена за/)).toBeInTheDocument();
  });
  it("Данные обновлены, дата последняя", () => {
    const preloadedState = {
      data: {
        loading: "succeeded",
        error: null,
        data: {
          imoex: [],
          securities: {},
          updatedAt: null,
          isFresh: true,
        },
      } as unknown as InitialData,
    };
    renderWithProviders(<App />, { preloadedState });
    expect(screen.queryByText(/загрузка/)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Информация загружена за/)
    ).not.toBeInTheDocument();
  });
});
