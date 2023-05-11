import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { customRender } from "../utils/test-customRender";
import TestModal from "./TestModal";

// vi.mock("next-auth/react");

interface Props {
  header: string;
  onClose: () => void;
  body: JSX.Element;
  onSubmit?: () => void;
}

it("should render the basic fields", async () => {
  customRender(<TestModal />);

  // screen.debug();
});
