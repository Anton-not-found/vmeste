"use client";

import { forwardRef } from "react";
import { mergeClassNames } from "@/lib/commonHelpers/mergeClassNames";
import styles from "../styles/Flex.module.scss";

type TProps = {
  children: React.ReactNode;
  align?: "center" | "start" | "end" | "normal" | "flex-start";
  justify?:
    | "center"
    | "start"
    | "end"
    | "space-between"
    | "normal"
    | "flex-start";
  vertical?: boolean;
  wrap?: boolean | "nowrap" | "wrap" | "wrap-reverse";
  gap?: string | number;
  fullWidth?: boolean;
  fullHeight?: boolean;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
};

export const Flex = forwardRef<HTMLDivElement, TProps>(
  (
    {
      children,
      align = "start",
      justify = "start",
      vertical = false,
      fullWidth = false,
      fullHeight = false,
      wrap,
      gap,
      style,
      className = "",
      onClick,
    },
    ref,
  ) => {
    const classNames = [styles.flex];

    if (vertical) {
      classNames.push(styles.vertical);
    } else {
      classNames.push(styles.horizontal);
    }

    const alignKey = `align-${align}` as keyof typeof styles;
    if (styles[alignKey]) {
      classNames.push(styles[alignKey]);
    }

    let justifyKey = `justify-${justify}`;
    if (justify === "space-between") {
      justifyKey = "justify-space-between";
    }
    if (styles[justifyKey as keyof typeof styles]) {
      classNames.push(styles[justifyKey as keyof typeof styles]);
    }

    if (wrap !== undefined) {
      let wrapKey = `wrap-${wrap}`;
      if (wrap === true) wrapKey = "wrap-true";
      if (wrap === false) wrapKey = "wrap-nowrap";

      if (styles[wrapKey as keyof typeof styles]) {
        classNames.push(styles[wrapKey as keyof typeof styles]);
      }
    }

    const finalClassName = mergeClassNames(classNames.join(" "), className);

    const styleProps: React.CSSProperties = { ...style };
    if (gap !== undefined) {
      const gapValue = typeof gap === "number" ? `${gap}px` : gap;
      styleProps.gap = gapValue;
    }

    if (fullWidth) {
      styleProps.width = "100%";
    }
    if (fullHeight) {
      styleProps.height = "100%";
    }

    return (
      <div
        onClick={onClick}
        style={styleProps}
        className={finalClassName}
        ref={ref}
      >
        {children}
      </div>
    );
  },
);

// Flex.displayName = 'Flex';
