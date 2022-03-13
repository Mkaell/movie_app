import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Form } from '../components/Form';
import './LoginPage.scss'

const RegisterPage = () => {
    const navigate = useNavigate()
    const auth = getAuth();

    const handleRegister = (email: any, password: any) => {

        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {

                // localStorage.setItem('user', JSON.stringify(user.uid));
                // dispatch(fetchingstart({
                //     email: user.email,
                //     token: user.accessToken,
                //     id: user.uid
                // }))
                navigate('/');
            })
            .catch(error => console.error(error))
    }
    return (
        <div className='login'>
            <div className='login-container'>
                <Form title='Sign up' handleClick={handleRegister} />
                <p>
                    Already have accounr <Link to='/login'>Sign in</Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage