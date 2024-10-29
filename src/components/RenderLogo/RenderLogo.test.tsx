import { renderWithProviders } from "../../redux/test/renderWithProviders";
import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { RenderLogo } from "./RenderLogo";
describe("component RenderLogo", () => {
  it("Компонент отображает фотографию", () => {
    renderWithProviders(<RenderLogo secid="AAAA" shortname="Компания" />);
    const image = screen.getByRole("img");
  });
  it("Фотографии нет, компонент отображает первую букву Тикера", () => {
    renderWithProviders(<RenderLogo secid="AAAA" shortname="Компания" />);
    const image = screen.getByRole("img");
    fireEvent.error(image);
    expect(screen.getByText(/A/)).toBeInTheDocument();
  });
});
