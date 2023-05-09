import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
document.body.appendChild(modalRoot);

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

const SignUpModal = ({ onClose, children }: Props) => {
  const el = document.createElement("div");

  modalRoot.appendChild(el);

  // return () => modalRoot.removeChild(el);

  return ReactDOM.createPortal(
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        {children}
        <hr />
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    el
  );
};

test("modal shows the children and a close button", () => {
  // Arrange
  const handleClose = vi.fn();

  // Act
  const { getByText } = render(
    <SignUpModal onClose={handleClose}>
      <div>test</div>
    </SignUpModal>
  );
  // Assert
  expect(getByText("test")).toBeTruthy();

  // Act
  fireEvent.click(getByText(/close/i));

  // Assert
  expect(handleClose).toHaveBeenCalledTimes(1);
});
