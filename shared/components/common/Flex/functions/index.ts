import { mergeStyles } from "@/lib/commonHelpers/mergeClassNames";


export const getStyle = (
  gap?: string | number,
  style?: React.CSSProperties,
): React.CSSProperties => {

  if (gap) {
    return mergeStyles({ gap: gap }, style);
  }

  return style ? style : {};
};
