import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import QueryProvider from "@/app/lib/QueryProvider";
import { SessionProvider } from "next-auth/react";
import { DayProvider } from "../stores/DayContext";

interface Props {
  children: React.ReactNode;
}

export default function AllTheProviders({ children }: Props) {
  return (
    <QueryProvider>
      {/* <SessionProvider> */}
      <DayProvider>{children}</DayProvider>
      {/* </SessionProvider> */}
    </QueryProvider>
  );
}

export const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
