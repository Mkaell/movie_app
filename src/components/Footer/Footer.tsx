import React from 'react'
import './footer.scss'
import { Favorite } from '@mui/icons-material'
const Footer = () => {
    return (

        <div className='footer'>
            © 2022, made with<Favorite />  by <a href='https://github.com/Mkaell'> Mkaell</a>
        </div>

    )
}

export default Footer