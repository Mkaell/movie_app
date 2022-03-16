import React, { FC, useState } from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';
import Input from '../input/Input'


interface IForm {
    title: string,
    handleClick(emeil: string, pass: string): void;
    handleLoginGoogle: () => void
}

const Form: FC<IForm> = ({ title, handleClick, handleLoginGoogle }) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <h2 className='mb-2'>{title}</h2>
            <Input
                className='mb-2'
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder='Email' />
            <Input
                className='mb-2'
                type="password"
                value={pass}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPass(e.target.value)}
                placeholder='Password' />
            <Button
                onClick={() => handleClick(email, pass)}
                variant="contained"
                sx={{ width: '100%', mb: '0.6rem', borderRadius: '10px' }}
            >{title}
            </Button>
            <Button
                onClick={() => handleLoginGoogle()}
                variant="outlined"
                sx={{ width: '100%', mb: '0.8rem', textTransform: 'none', borderRadius: '10px' }}
                startIcon={<GoogleIcon />}
            >
                {title} with Google
            </Button>

        </div>
    )
}

export default Form