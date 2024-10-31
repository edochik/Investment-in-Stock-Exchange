import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Autocomplete } from "./Autocomplete";
import { renderWithProviders } from "../../redux/test/renderWithProviders";

describe("component Autocomplete", () => {
  it("пользователь нажимает на элемент из списка", async () => {
    const user = userEvent.setup();
    const mockFn = jest.fn();
    renderWithProviders(
      <Autocomplete
        items={["red", "blue", "green"]}
        filterByKey={(value, query) => value.startsWith(query)}
        render={(item) => <p>{item}</p>}
        value={null}
        setValue={mockFn}
        inputStringValue={(arg) => arg}
      />,
      {}
    );
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    await user.click(items[0]);
    const input = screen.getByRole("textbox");
    expect(input).toHaveDisplayValue("red");
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("red");
  });
  it("пользователь вводит значение в input", async () => {
    const user = userEvent.setup();
    const mockFn = jest.fn();
    renderWithProviders(
      <Autocomplete
        items={["red", "blue", "green", "black"]}
        filterByKey={(value, query) => value.startsWith(query)}
        render={(item) => <p>{item}</p>}
        value={null}
        setValue={mockFn}
        inputStringValue={(arg) => arg}
      />,
      {}
    );
    const input = screen.getByRole("textbox");
    await user.type(input, "b");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    const inputValue = screen.getByRole("textbox");
    expect(inputValue).toHaveDisplayValue("b");
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith(null);
  });
});

// ??? отображается li элемент проверить на верхне уровнем компоненте
// {
  /* <body>
      <div>
        <div
          class="Autocomplete"
        >
          <label
            class="label"
          >
            Введите название:
            <input
              class="input"
              type="text"
              value="red"
            />
          </label>
          <ul
            class="list"
          >
            <li
              class="item"
            >
              <p>
                red
              </p>
            </li>
          </ul>
        </div>
      </div>
    </body> */
// }
// https://testing-library.com/docs/queries/about/
