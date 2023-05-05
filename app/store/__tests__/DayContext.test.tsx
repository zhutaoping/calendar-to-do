import { useEffect } from "react";
import { vi } from "vitest";
import { render, renderHook } from "@testing-library/react";
import { DayStoreState, useDayStore } from "../DayContext";

interface Props {
  effect: (items: DayStoreState) => void;
}

function TestComponent({ effect }: Props) {
  const items = useDayStore();

  useEffect(() => {
    effect(items);
  }, [items, effect]);

  return null;
}

it("should set dayInView if dayInView is null", () => {
  const items = renderHook(() => useDayStore()).result.current;
  const effect = vi.fn().mockImplementation((items: DayStoreState) => {
    if (!items.dayInView) {
      items.setDayInView?.(new Date());
    }
  });
  render(<TestComponent effect={effect} />);
  expect(items.dayInView).not.toBeNull();
});

it("should set activeDate if activeDate is null", () => {
  const items = renderHook(() => useDayStore()).result.current;
  const effect = vi.fn().mockImplementation((items: DayStoreState) => {
    if (!items.activeDate) {
      items.setActiveDate?.(new Date());
    }
  });
  render(<TestComponent effect={effect} />);
  expect(items.activeDate).not.toBeNull();
});
