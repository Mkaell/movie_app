import React from 'react';


import './button.scss';

// Посмотреть еще раз 

type IOnClick = React.MouseEventHandler<
    HTMLButtonElement | HTMLAnchorElement
>

interface IButton {
    className?: string;
    onClick: IOnClick;
    children: React.ReactNode;
}

const Button = (props: IButton) => {
    console.log(props);
    return (
        <button
            className={`btn ${props.className}`}
            onClick={(e) => props.onClick(e)}
        >
            {props.children}
        </button>
    );
}

export const OutlineButton = (props: any) => {
    return (
        <Button
            className={`btn-outline small`}
            onClick={() => props.onClick()}
        >
            {props.children}
        </Button>
    );
}



export default Button;
