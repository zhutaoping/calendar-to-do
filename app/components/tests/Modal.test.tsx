import { vi } from "vitest";
import { customRender } from "../../utils/test-customRender";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "../Modal";

interface Props {
  header: string;
  onClose: () => void;
  body: JSX.Element;
  onSubmit?: () => void;
}

it("should render the basic fields", async () => {
  const handleClose = vi.fn(() => {
    console.log("test close");
  });

  render(
    <Modal header="header" onClose={handleClose} body={<div>Test body</div>} />
  );
  screen.debug();
  await userEvent.click(screen.getByRole("button"));
});
