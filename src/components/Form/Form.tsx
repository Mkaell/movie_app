import React, { useState } from 'react'
import Button from '../button/Button';
import Input from '../input/Input'

const Form = (props: any) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <h2>{props.title}</h2>
            <Input
                className='mb-3'
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder='email' />
            <Input
                className='mb-3'
                type="password"
                value={pass}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPass(e.target.value)}
                placeholder='password' />
            <Button onClick={() => props.handleClick(email, pass)} >{props.title}</Button>

        </div>
    )
}

export default Form