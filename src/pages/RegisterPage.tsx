import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form } from '../components/Form';
import { ParticlesBackground } from '../components/Particles';

import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import './LoginPage.scss'

const RegisterPage: FC = () => {

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

    const handleLoginGoogle = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential?.accessToken;
                // The signed-in user info.
                // const user = result.user;
                // ...
                navigate('/');
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`${errorCode}: ${errorMessage}`);

                // The email of the user's account used.
                // const email = error.email;
                // // The AuthCredential type that was used.
                // const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    return (
        <>
            <ParticlesBackground />
            <div className='login'>
                <div className='login-container'>
                    <Form title='Sign up' handleClick={handleRegister} handleLoginGoogle={handleLoginGoogle} />
                    <p>
                        Already have account? <Link to='/login' style={{ borderBottom: ' 1px solid #ff9800', padding: '0.5rem' }}> Log in</Link>
                    </p>
                </div>
            </div >
        </>

    )
}

export default RegisterPage