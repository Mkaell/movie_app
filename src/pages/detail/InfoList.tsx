import React, { FC } from 'react'

interface IInfoList {
    icon?: JSX.Element;
    children?: React.ReactNode;
    title?: string;
    info: string;

}

const InfoList: FC<IInfoList> = (props) => {
    return (
        <div style={{ display: 'flex' }}>
            {props.icon} <p style={{ display: 'inline', fontFamily: 'Montserrat' }}>{props.title} {props.info}</p>
        </div>
    )
}

export default InfoList