import { renderWithProviders } from "../../test/renderWithProviders";
import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { RenderLogo } from "./RenderLogo";
describe("Тест компонента RenderLogo", () => {
  it("Компонент отображает фотографию", () => {
    renderWithProviders(<RenderLogo secid="AAAA" shortname="Компания" />);
    expect(screen.getByAltText(/логотип Компания/)).toBeInTheDocument();
  });
  it("Фотографии нет, компонент отображает первую букву Тикера", () => {
    renderWithProviders(<RenderLogo secid="AAAA" shortname="Компания" />);
    const image = screen.getByRole("img");
    fireEvent.error(image);
    expect(screen.getByText(/A/)).toBeInTheDocument();
  });
});
