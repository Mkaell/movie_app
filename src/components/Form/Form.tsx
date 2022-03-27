import React, { FC, useState } from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';
import { Input } from '../input'
import './Form.scss'

interface IForm {

    title: string,
    handleClick(emeil: string, pass: string): void,
    handleLoginGoogle(): void,
    errorEmail: string,
    errorPassword: string,

}

const Form: FC<IForm> = ({ title, handleClick, handleLoginGoogle, errorEmail, errorPassword }) => {
    const [email, setEmail] = useState<string>('');
    const [pass, setPass] = useState<string>('');

    return (
        <>
            <h2 className='mb-2' style={{ textAlign: 'center' }}>{title}</h2>
            <form style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} >
                <Input
                    className={errorEmail ? 'error mb-2' : 'mb-2'}
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder='Email'
                />
                {errorEmail && <div className='error-email'>{errorEmail}</div>}
                <Input
                    className={errorPassword ? 'error mb-2' : 'mb-2'}
                    type="password"
                    value={pass}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPass(e.target.value)}
                    placeholder='Password'
                />
                {errorPassword && <p className='error-password'>{errorPassword}</p>}
                <Button
                    onClick={() => {

                        handleClick(email, pass)
                    }
                    }
                    variant="contained"
                    sx={{ width: '100%', mb: '0.6rem', borderRadius: '10px' }}
                >{title}
                </Button>
            </form>

            <Button
                onClick={() => handleLoginGoogle()}
                variant="outlined"
                sx={{ width: '100%', mb: '0.8rem', textTransform: 'none', borderRadius: '10px' }}
                startIcon={<GoogleIcon />}
            >
                {title} with Google
            </Button>

        </>
    )
}

export default Form