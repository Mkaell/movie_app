import React, { FC } from 'react'

interface IInfoItem {
    icon?: JSX.Element;
    children?: React.ReactNode;
    title?: string;
    info: string;

}

const InfoItem: FC<IInfoItem> = (props) => {
    return (
        <div style={{ display: 'flex' }}>
            {props.icon} <p style={{ display: 'inline', fontFamily: 'Montserrat' }}>{props.title} {props.info}</p>
        </div>
    )
}

export default InfoItem