import { mergeClassNames } from "@/lib/commonHelpers/mergeClassNames";
import styles from "../styles/Text.module.scss";

type TProps = {
  children: React.ReactNode;
  ellipsis?: boolean;
  style?: React.CSSProperties;
  className?: string;
  type?: "secondary";
  strong?: boolean;
  nowrap?: boolean;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
};

export const Text: React.FC<TProps> = ({
  children,
  ellipsis = false,
  style = {},
  className = "",
  type,
  strong,
  nowrap,
  onClick,
}) => {
  const classNames = [styles.text];

  if (type === "secondary") {
    classNames.push(styles.secondary);
  }

  if (strong) classNames.push(styles.strong);
  if (nowrap) classNames.push(styles.nowrap);
  if (ellipsis) classNames.push(styles.ellipsis);

  const finalClassName = mergeClassNames(classNames.join(" "), className);

  return (
    <span style={style} className={finalClassName} onClick={onClick}>
      {children}
    </span>
  );
};
