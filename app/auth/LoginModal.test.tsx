import { vi } from "vitest";
import {
  act,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import useLoginModalStore from "../store/LoginModalStore";
import LoginModal from "./LoginModal";
import { customRender } from "../utils/test-customRender";

vi.mock("next-auth/react");

it("should render the basic fields", async () => {
  // const { result, rerender } = renderHook(() => useLoginModalStore());
  // expect(result.current.isOpen).toBe(false);
  // result.current.onOpen();
  // waitFor(() => expect(result.current.isOpen).toBe(true));
  // rerender();
  // const { container } = customRender(<LoginModal header="Log In" />);
  // // expect(await screen.queryByText(/log in/i)).toBeTruthy();
  // screen.debug();
});
