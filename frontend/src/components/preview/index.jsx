import React from "react";
import { Card } from "reactstrap";

export const PreviewCard = ({ className, bodyClass, ...props }) => {
    return (
        <Card className={`card-preview ${className ? className : ""}`}>
            <div className={`card-inner ${bodyClass ? bodyClass : ""}`}>{props.children}</div>
        </Card>
    );
};

export const PreviewAltCard = ({ className, bodyClass, noBorder, ...props }) => {
    return (
        <Card className={`${!noBorder ? "" : ""} ${className ? className : ""}`}>
            <div className={`card-inner ${bodyClass ? bodyClass : ""}`}>{props.children}</div>
        </Card>
    );
};