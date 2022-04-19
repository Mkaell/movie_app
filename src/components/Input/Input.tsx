import React from 'react';

import './input.scss';

const Input = (props: any): JSX.Element => {
    return (
        <input
            className={props.className}
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={(e) => props.onChange(e)}
        />
    );
}

export default Input;
