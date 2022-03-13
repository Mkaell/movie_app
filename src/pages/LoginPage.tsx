import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Form } from '../components/Form';
import './LoginPage.scss'


export default function LoginPage() {
    const navigate = useNavigate()

    const handleLogin = async (email: any, password: any) => {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                console.log(user);

                // dispatch(fetchingstart({
                //     email: user.email,
                //     token: user.accessToken,
                //     id: user.uid
                // }))
                navigate('/');
            })
            .catch(error => alert(error.message))
    }

    return (
        <div className='login'>
            <div className="login-container">
                <Form title='Log in' handleClick={handleLogin} />
                <p> or <Link to='/registration' > register</Link></p>
            </div>
        </div>

    );
}