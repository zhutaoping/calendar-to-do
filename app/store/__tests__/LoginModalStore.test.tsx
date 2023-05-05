import { useEffect } from "react";
import { vi } from "vitest";
import { render } from "@testing-library/react";
import useLoginModalStore, { LoginModalState } from "../LoginModalStore";

interface Props {
  selector: (state: LoginModalState) => Partial<LoginModalState>;
  effect: (items: Partial<LoginModalState>) => void;
}

function TestComponent({ selector, effect }: Props) {
  const items = useLoginModalStore(selector);

  useEffect(() => {
    effect(items);
  }, [items, effect]);

  return null;
}

it("should open addEven modal if it's close", () => {
  const selector = (state: LoginModalState) => ({
    isOpen: state.isOpen,
    onOpen: state.onOpen,
  });
  const effect = vi
    .fn()
    .mockImplementation((items: Partial<LoginModalState>) => {
      if (!items.isOpen) {
        items.onOpen?.();
      }
    });

  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledTimes(2);
});

it("should close addEven modal if it's been open", () => {
  const selector = (state: LoginModalState) => ({
    isOpen: state.isOpen,
    onOpen: state.onOpen,
    onClose: state.onClose,
  });

  let notOpenYet = true;
  const effect = vi
    .fn()
    .mockImplementation((items: Partial<LoginModalState>) => {
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
