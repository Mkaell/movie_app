import React from 'react'
import './footer.scss'
import { Favorite } from '@mui/icons-material'
const Footer = () => {
    return (

        <div className='footer'>
            © 2022, made with <Favorite sx={{ margin: '0 2px', color: 'red' }} /> by
            <a href='https://github.com/Mkaell' style={{ marginLeft: '2px' }}> Mkaell</a>
        </div>

    )
}

export default Footer