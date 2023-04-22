import styles from "./MyTooltip.module.css";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

interface Props {
  children: React.ReactNode;
}

export default function MyTooltip({ children }: Props) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className={styles.TooltipContent}
            sideOffset={5}
            data-side="bottom"
          >
            Flip the card
            <TooltipPrimitive.Arrow className={styles.TooltipArrow} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
