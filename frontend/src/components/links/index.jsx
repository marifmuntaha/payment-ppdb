import React from "react";
import Icon from "../icon";
import classNames from "classnames";
import { Link } from "react-router-dom";

export const LinkItem = ({ ...props }) => {
    return (
        <li>
            {props.tag !== "a" ? (
                <Link to={import.meta.env.BASE_URL + props.link} {...props}>
                    {props.icon ? <Icon name={props.icon} /> : null} <span>{props.text || props.children}</span>
                </Link>
            ) : (
                <a href={import.meta.env.BASE_URL + props.link} onClick={(ev) => ev.preventDefault()}>
                    {props.icon ? <Icon name={props.icon} /> : null} <span>{props.text || props.children}</span>
                </a>
            )}
        </li>
    );
};

export const LinkList = ({ ...props }) => {
    const listClasses = classNames({
        "link-list": !props.opt,
        "link-list-opt": props.opt,
        [`${props.className}`]: props.className,
    });
    return <ul className={listClasses}>{props.children}</ul>;
};