/* eslint-disable testing-library/no-unnecessary-act */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import userEvent from "@testing-library/user-event";
import {
  screen,
  within,
  waitForElementToBeRemoved,
} from "@testing-library/react";
let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild();
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders App home page", () => {
  act(() => {
    render(<Provider store={store}>
      <App />
    </Provider>, container);
  });
  expect(container.textContent).toContain("Beekeeping");
});

it("renders login page on login click", () => {
  act(() => {
    render(<Provider store={store}>
      <App />
    </Provider>, container);
  });
  userEvent.click(screen.getByRole('link', { name: 'login'}))
  expect(container.textContent).toContain("username");
  expect(container.textContent).toContain("password");
});

it("renders signup page on register click", () => {
  act(() => {
    render(<Provider store={store}>
      <App />
    </Provider>, container);
  });
  userEvent.click(screen.getByRole('link', { name: 'register'}))
  expect(container.textContent).toContain("username");
  expect(container.textContent).toContain("Email");
});
