import type { VariantProps } from "class-variance-authority";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * A link that looks like a button.
 *
 * Every "button" on this site navigates somewhere, so each one has to stay a
 * real <a>. Passing an anchor to shadcn's `Button` would work visually, but
 * Base UI stamps `role="button"` onto it, and a screen reader would then
 * announce "button" for something that is a link. Borrowing `buttonVariants`
 * keeps the styling identical while leaving the element semantics alone.
 */
export function LinkButton({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"a"> & VariantProps<typeof buttonVariants>) {
  return <a className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

/** Shorthand for the `target`/`rel` pair every outbound link needs. */
export const externalLinkProps = {
  target: "_blank",
  rel: "noreferrer",
} as const;
