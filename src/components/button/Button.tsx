import { Button } from '@mui/material';
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
    variant?: string
    sx?: {}
}

// const Button = (props: IButton) => {

//     return (
//         <ButtonBase
//             variant="outlined"
//             className={`btn ${props.className}`}
//             onClick={(e) => props.onClick(e)}
//             sx={{ my: 2, display: 'block' }}
//         >
//             {props.children}
//         </ButtonBase>

//     );
// }

// export const OutlineButton = (props: any) => {
//     return (
//         <Button
//             className={`btn-outline small`}
//             onClick={() => props.onClick()}
//         >
//             {props.children}
//         </Button>
//     );
// }



export default Button;
