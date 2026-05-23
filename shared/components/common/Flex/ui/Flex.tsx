'use client';

import { mergeClassNames } from "@/lib/commonHelpers/mergeClassNames";
import { forwardRef } from "react";
import { getStyle } from "../functions";

type TProps = {
  children: React.ReactNode;
  align?: "center" | "start" | "end" | "normal" | "flex-start";
  justify?: "center" | "start" | "end" | "space-between" | "normal" | "flex-start";
  vertical?: boolean;
  wrap?: boolean | "nowrap" | "wrap";
  gap?: string | number;
  style?: React.CSSProperties;
  className?: string;
  ref?: any;
  onClick?: () => void;
};


export const Flex = forwardRef<HTMLDivElement, TProps>(
  (
    {
      children,
      align = "start",
      justify = "start",
      // align = "normal",
      // justify = "normal",
      vertical = false,
      wrap,
      gap,
      style,
      className,
      onClick,
    },
    ref,
  ) => {
    const preparedJustify =
      justify === "space-between" ? justify.split("-")[1] : justify;

    const alignClassName = `items-${align}`;

    const justifyClassName = `justify-${preparedJustify}`;

    const verticalClassName = vertical ? "flex-col" : "flex-row";

    const wrapClassName = wrap ? "flex-wrap" : `flex-${wrap}`;

    //   const classNameProps: string = mergeClassNames('inline-flex',
    const classNameProps: string = mergeClassNames(
      "flex",
      className,
      alignClassName,
      justifyClassName,
      wrapClassName,
      verticalClassName,
    );

    const styleProps: React.CSSProperties = getStyle(gap, style);

    return (
      <div
        onClick={onClick}
        style={styleProps}
        className={classNameProps}
        ref={ref}
      >
        {children}
      </div>
    );
  },
);
