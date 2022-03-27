import React, { FC, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form } from '../components/Form';
import { ParticlesBackground } from '../components/Particles';

import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import './LoginPage.scss'
import { AlertModal } from '../components/Alert';
import { UserContext } from '../App';

const RegisterPage: FC = () => {

    const navigate = useNavigate()

    const auth = useContext(UserContext);

    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [open, setOpen] = useState<boolean>(false);
    const [valueModal, setValueModal] = useState<string>('');

    const handleClose = (reason?: string) => {

        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleRegister = (email: any, password: any) => {

        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                navigate('/');
            })
            .catch(error => {

                switch (error.code) {
                    case "auth/invalid-email":
                        setErrorEmail('Email address is not valid.');
                        break;
                    case "auth/email-already-in-use":
                        setErrorEmail('There already exists an account with the given email address.');
                        break;
                    case "auth/weak-password":
                        setErrorPassword('Password should be at least 6 characters');
                        break;
                    case "auth/internal-error":
                        setErrorPassword('This field is required')
                        break;
                    default:
                        setValueModal(error.message);
                        setOpen(true)
                        break;
                }

            })
    }

    const handleLoginGoogle = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {

                navigate('/');
            }).catch((error) => {

                setValueModal(error.message);
                setOpen(true);

            });
    }

    return (
        <>
            <AlertModal open={open} handleClose={handleClose} children={valueModal} severity='error' />
            <ParticlesBackground />
            <div>
                <div className='login-container'>
                    <Form
                        errorPassword={errorPassword}
                        errorEmail={errorEmail}
                        title='Sign up'
                        handleClick={handleRegister}
                        handleLoginGoogle={handleLoginGoogle} />
                    <p style={{ textAlign: 'center' }}>
                        Already have account?
                        <Link
                            to='/login'
                            style={{ borderBottom: ' 1px solid #ff9800', padding: '0.5rem' }}>
                            Log in
                        </Link>
                    </p>
                </div>
            </div >
        </>

    )
}

export default RegisterPage