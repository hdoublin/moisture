import React from "react";
import { IconButton } from '@mui/material';

export default function StyleButton(props) {
    const onToggle = (e) => {
        e.preventDefault();
        props.onToggle(props.style);
    };

    return <IconButton color={props.active ? "primary" : "default"} component="span" onMouseDown={onToggle}>{props.icon}</IconButton>;
}