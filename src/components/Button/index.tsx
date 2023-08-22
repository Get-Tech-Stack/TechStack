import React from 'react';
import './button.scss';

export type ButtonProps = {
    action: (e: any) => void;
    label: string;
};

export const Button = (props: ButtonProps) => (
    <button className="icbs-button" onClick={props.action}>
        {props.label}
    </button>
);

export default Button;
