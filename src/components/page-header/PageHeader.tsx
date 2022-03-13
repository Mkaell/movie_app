import React, { FunctionComponent } from 'react';
import poster from '../../assets/poster.png'
import './page-header.scss';



const PageHeader: FunctionComponent = (props) => {
    return (
        <div className="page-header" style={{ backgroundImage: `url(${poster})` }} >
            <h2>{props.children}</h2>
        </div >
    );
}


export default PageHeader;
