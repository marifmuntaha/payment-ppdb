import React from "react";
import classnames from "classnames";

export const Col = ({ sm, lg, md, xl, xxl, size, className, ...props }) => {
    let classNames = classnames({
        [`col-sm-${sm}`]: sm,
        [`col-lg-${lg}`]: lg,
        [`col-md-${md}`]: md,
        [`col-md-${xl}`]: xl,
        [`col-xxl-${xxl}`]: xxl,
        [`col-${size}`]: size,
        [`${className}`]: className,
    });
    return <div className={classNames}>{props.children}</div>;
};
export const Row = ({ className, ...props }) => {
    const rowClass = classnames({
        row: true,
        [`${className}`]: className,
    });
    return <div className={rowClass}>{props.children}</div>;
};