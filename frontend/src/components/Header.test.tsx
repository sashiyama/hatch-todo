import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("renders the header with logo and title", () => {
  render(<Header />);
  const logoElement = screen.getByText("😍");
  const titleElement = screen.getByText("Marvelous To Do");
  expect(logoElement).toBeInTheDocument();
  expect(titleElement).toBeInTheDocument();
});
