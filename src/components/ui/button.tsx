import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group/button relative inline-flex shrink-0 items-center justify-center overflow-hidden",
    "whitespace-nowrap border border-transparent bg-clip-padding font-medium outline-none select-none",
    "transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-out",
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
    "active:not-aria-[haspopup]:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
    "dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "before:pointer-events-none before:absolute before:inset-0 before:z-0",
    "after:pointer-events-none after:absolute after:z-0",
    "[&>span]:relative [&>span]:z-10",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",

        outline:
          "border-border bg-background text-foreground shadow-xs hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",

        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",

        ghost:
          "text-foreground hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",

        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",

        link: "h-auto rounded-none border-0 bg-transparent px-0 py-0 text-primary underline-offset-4 hover:underline shadow-none",

        animated: [
          "border-border/70 bg-foreground text-background",
          "shadow-[0_8px_30px_-12px_rgba(0,0,0,0.28)]",
          "before:hidden",
          "after:inset-0 after:-left-[22%] after:-right-[22%]",
          "after:origin-center after:skew-x-[-24deg] after:scale-x-0",
          "after:bg-card after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.16,1,0.3,1)]",
          "hover:text-foreground dark:hover:text-foreground",
          "hover:border-foreground/15 dark:hover:border-white/10",
          "hover:after:scale-x-100 focus-visible:after:scale-x-100",
        ].join(" "),

        "animated-primary": [
          "border-primary/20 bg-primary text-primary-foreground",
          "shadow-[0_10px_30px_-12px_color-mix(in_oklch,var(--primary)_35%,transparent)]",
          "before:hidden",
          "after:inset-0 after:-left-[22%] after:-right-[22%]",
          "after:origin-center after:skew-x-[-24deg] after:scale-x-0",
          "after:bg-card after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.16,1,0.3,1)]",
          "hover:text-foreground dark:hover:text-foreground",
          "hover:border-primary/30 dark:hover:border-primary/25",
          "hover:after:scale-x-100 focus-visible:after:scale-x-100",
        ].join(" "),

        "animated-muted": [
          "border-border bg-background text-foreground",
          "shadow-xs",
          "before:hidden",
          "after:inset-0 after:-left-[22%] after:-right-[22%]",
          "after:origin-center after:skew-x-[-24deg] after:scale-x-0",
          "after:bg-muted after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.16,1,0.3,1)]",
          "hover:text-foreground",
          "hover:border-border",
          "hover:after:scale-x-100 focus-visible:after:scale-x-100",
        ].join(" "),
      },

      size: {
        default:
          "h-9 gap-1.5 rounded-md px-3 text-sm in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",

        xs: "h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",

        sm: "h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 text-sm in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",

        lg: "h-10 gap-1.5 rounded-xl px-4 text-sm has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",

        xl: "h-[50px] gap-2 rounded-xl px-7 text-[15px] has-data-[icon=inline-end]:pr-6 has-data-[icon=inline-start]:pl-6",

        icon: "size-9 rounded-md",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md",
        "icon-lg": "size-10 rounded-xl",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return (
      <Slot
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {React.cloneElement(
          child,
          {},
          <span className="relative z-10 inline-flex items-center justify-center gap-2 w-full h-full">
            {child.props.children}
          </span>
        )}
      </Slot>
    );
  }

  const Comp = "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </Comp>
  );
}

export { Button, buttonVariants };

{
  /* <Button variant="animated-primary" size="xl">Start free</Button>
<Button variant="animated" size="xl">Book a demo</Button>
<Button variant="animated-muted" size="xl">Learn more</Button> */
}
