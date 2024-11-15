import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Cart } from "./Cart";
import { renderWithProviders } from "../../test/renderWithProviders";
import { InitialData } from "../../redux/initialDataSlice/initialDataSlice";

describe("Тест компонента Cart", () => {
  it("Отображает пустую корзину с кнопкой disabled", async () => {
    const preloadedState = {
      cart: [],
    };
    renderWithProviders(<Cart />, { preloadedState });
    const openCartBtn = screen.getByRole("button", { name: /0/ });
    expect(openCartBtn).toHaveAttribute("disabled");
  });

  it("Отображает компании в корзине и позволяет их раскрывать, при удалении остается одна компания", async () => {
    const preloadedState = {
      cart: ["aaaa", "bbbb"],
      data: {
        data: {
          imoex: [],
          securities: {
            aaaa: {
              secid: "aaaa",
              shortname: "Компания A",
            },
            bbbb: {
              secid: "bbbb",
              shortname: "Компания B",
            },
          },
        },
      } as unknown as InitialData,
    };
    renderWithProviders(<Cart />, { preloadedState });
    const openCartBtn = screen.getByRole("button", { name: /2/ });
    const user = userEvent.setup();
    expect(openCartBtn).not.toHaveAttribute("disabled");
    await user.click(openCartBtn);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    const buttons = screen.getAllByRole("button");
    const buttonRemove = buttons[buttons.length - 1];
    await user.click(buttonRemove);
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByText(/Компания A/)).toBeInTheDocument();
  });

  it("При удаление последней компании, компонент закрывается и становится disabled", async () => {
    const preloadedState = {
      cart: ["bbbb"],
      data: {
        data: {
          imoex: [],
          securities: {
            aaaa: {
              secid: "aaaa",
            },
            bbbb: {
              secid: "bbbb",
            },
          },
        },
      } as unknown as InitialData,
    };
    renderWithProviders(<Cart />, { preloadedState });
    const user = userEvent.setup();
    const openCartBtnWithItem = screen.getByRole("button", { name: /1/ });
    await user.click(openCartBtnWithItem);
    const buttons = screen.getAllByRole("button");
    const buttonRemove = buttons[buttons.length - 1];
    await user.click(buttonRemove);
    const openCartBtnNotItem = screen.getByRole("button", { name: /0/ });
    expect(openCartBtnNotItem).toHaveAttribute("disabled");
  });
  it("Закрывает корзину при клике вне области", async () => {
    const preloadedState = {
      cart: ["bbbb"],
      data: {
        data: {
          imoex: [],
          securities: {
            aaaa: {
              secid: "aaaa",
            },
            bbbb: {
              secid: "bbbb",
            },
          },
        },
      } as unknown as InitialData,
    };
    renderWithProviders(<Cart />, { preloadedState });
    const openCartBtn = screen.getByRole("button", { name: /1/ });
    const user = userEvent.setup();
    await user.click(openCartBtn);
    await user.click(document.body);
    expect(screen.queryByText(/bbbb/)).not.toBeInTheDocument();
  });
  it("Закрывает список при скролле", async () => {
    const preloadedState = {
      cart: ["bbbb"],
      data: {
        data: {
          imoex: [],
          securities: {
            aaaa: {
              secid: "aaaa",
            },
            bbbb: {
              secid: "bbbb",
            },
          },
        },
      } as unknown as InitialData,
    };
    renderWithProviders(<Cart />, { preloadedState });
    const openCartBtn = screen.getByRole("button", { name: /1/ });
    const user = userEvent.setup();
    await user.click(openCartBtn);
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    expect(screen.queryByText(/bbbb/)).not.toBeInTheDocument();
  });
});
