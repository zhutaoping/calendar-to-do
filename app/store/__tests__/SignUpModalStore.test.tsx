import { useEffect } from "react";
import { vi } from "vitest";
import { render } from "@testing-library/react";
import useSignUpModalStore, { SignUpModalState } from "../SignUpModalStore";

interface Props {
  selector: (state: SignUpModalState) => Partial<SignUpModalState>;
  effect: (items: Partial<SignUpModalState>) => void;
}

function TestComponent({ selector, effect }: Props) {
  const items = useSignUpModalStore(selector);

  useEffect(() => {
    effect(items);
  }, [items, effect]);

  return null;
}

it("should open addEven modal if it's close", () => {
  const selector = (state: SignUpModalState) => ({
    isOpen: state.isOpen,
    onOpen: state.onOpen,
  });
  const effect = vi
    .fn()
    .mockImplementation((items: Partial<SignUpModalState>) => {
      if (!items.isOpen) {
        items.onOpen?.();
      }
    });

  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledTimes(2);
});

it("should close addEven modal if it's been open", () => {
  const selector = (state: SignUpModalState) => ({
    isOpen: state.isOpen,
    onOpen: state.onOpen,
    onClose: state.onClose,
  });

  let notOpenYet = true;
  const effect = vi
    .fn()
    .mockImplementation((items: Partial<SignUpModalState>) => {
      if (notOpenYet) {
        items.onOpen?.();
        notOpenYet = false;
      } else if (items.isOpen) {
        items.onClose?.();
      }
    });
  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledTimes(3);
});
