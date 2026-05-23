/**
 * Allows to merge `classNames`.
 */
export const mergeClassNames = (...classNameList: Array<string | null | undefined | false>) => {
    return classNameList.filter(Boolean).join(' ');
};


export const mergeStyles = (...styles: Array<React.CSSProperties | undefined>) => {
    return Object.assign({}, ...styles);
};