import { render, screen } from "@testing-library/react";
import Providers from "./lib/Providers";
import SignUpModal from "./users/SignUpModal";
import { vi } from "vitest";

vi.mock("next-auth/react");

describe("Page", () => {
  it("should render SignUpModal", () => {
    const { container } = render(
      <Providers>{<SignUpModal header="Sign Up" />}</Providers>
    );
    expect(container).toBeInTheDocument();
  });
});
