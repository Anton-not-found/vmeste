import { mergeClassNames } from "@/lib/commonHelpers/mergeClassNames";
import styles from "../styles/Text.module.scss";

type TProps = {
  children: React.ReactNode;
  ellipsis?: boolean;
  style?: React.CSSProperties;
  className?: string;
  type?: "primary" | "secondary" | "tertiary" | "warning";
  size?: "s" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl" | "xxxxl";
  maxLines?: 1 | 2 | 3 | 4;
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
  size = "sm",
  maxLines,
  strong,
  nowrap,
  onClick,
}) => {
  const classNames = [styles.text];

  if (type === "secondary") {
    classNames.push(styles.secondary);
  }
  if (type === "primary") {
    classNames.push(styles.primary);
  }
  if (type === "tertiary") {
    classNames.push(styles.tertiary);
  }
  if (type === "warning") {
    classNames.push(styles.warning);
  }
  if (size === "s") {
    classNames.push(styles.s);
  }
  if (size === "xs") {
    classNames.push(styles.xs);
  }
  if (size === "sm") {
    classNames.push(styles.sm);
  }
  if (size === "md") {
    classNames.push(styles.md);
  }
  if (size === "lg") {
    classNames.push(styles.lg);
  }
  if (size === "xl") {
    classNames.push(styles.xl);
  }
  if (size === "xxl") {
    classNames.push(styles.xxl);
  }
  if (size === "xxxl") {
    classNames.push(styles.xxxl);
  }
  if (size === "xxxxl") {
    classNames.push(styles.xxxxl);
  }

  if (strong) classNames.push(styles.strong);
  if (nowrap) classNames.push(styles.nowrap);

  // if (maxLines && maxLines > 1) {
  //   classNames.push(styles[`line-clamp-${maxLines}`]);
  //   // Добавляем inline-стили для гарантии
  //   style = {
  //     ...style,
  //     display: '-webkit-box',
  //     WebkitLineClamp: maxLines,
  //     WebkitBoxOrient: 'vertical',
  //     overflow: 'hidden',
  //     textOverflow: 'ellipsis'
  //   };
  // } else if (ellipsis || maxLines === 1) {
  //   classNames.push(styles.ellipsis);
  // }

  if (maxLines && maxLines > 1) {
    classNames.push(styles[`line-clamp-${maxLines}`]);
  } else if (ellipsis || maxLines === 1) {
    classNames.push(styles.ellipsis);
  }
  const finalClassName = mergeClassNames(classNames.join(" "), className);

  return (
    <>
      {maxLines && maxLines > 1 ? (
        <div>
          <span style={style} className={finalClassName} onClick={onClick}>
            {children}
          </span>
        </div>
      ) : (
        <span style={style} className={finalClassName} onClick={onClick}>
          {children}
        </span>
      )}
    </>
  );
};
