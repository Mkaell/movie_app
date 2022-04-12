
import { FC, useContext, useState } from 'react';
import { AlertModal } from '../../components/Alert';
import { UserContext } from '../../App';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from '../../components/Form';
import { ParticlesBackground } from '../../components/Particles';

import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import './LoginPage.scss'
import { NavigationPath } from '../../Routes/enumsNavigation';



const LoginPage: FC = () => {

    const navigate = useNavigate();

    const auth = useContext(UserContext);

    const [open, setOpen] = useState<boolean>(false);
    const [valueModal, setValueModal] = useState<string>('');
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')


    const clearError = () => {
        setErrorEmail('')
        setErrorPassword('')
    }

    const handleClose = (reason?: string) => {

        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleLogin = async (email: string, password: string) => {

        clearError()
        await signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {

                navigate('/');
            })
            .catch(error => {

                switch (error.code) {
                    case "auth/invalid-email":
                        setErrorEmail('Email address is not valid.');
                        break;
                    case "auth/user-disabled":
                        setErrorEmail('There is no user corresponding to the given email.');
                        break;
                    case "auth/user-not-found":
                    case "auth/wrong-password":
                        setValueModal('Invalid email or password!');
                        setErrorEmail('Email or password address is not valid.');
                        setErrorPassword('Email or password address is not valid.');
                        setOpen(true)
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

                const errorMessage = error.message;
                setOpen(true);
                setErrorEmail(errorMessage)

            });
    }

    return (
        <>
            <AlertModal open={open} handleClose={handleClose} children={valueModal} severity='error' />
            <ParticlesBackground />
            <div>

                <div className="login-container">
                    <Form
                        errorPassword={errorPassword}
                        errorEmail={errorEmail}
                        title='Log in'
                        handleClick={handleLogin}
                        handleLoginGoogle={handleLoginGoogle} />
                    <p style={{ textAlign: 'center' }}>
                        Don't have an account?
                        <Link
                            to={NavigationPath.REGISTRATION}
                            style={{ borderBottom: ' 1px solid #ff9800', padding: '0.5rem' }}>
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>

        </>


    );
}

export default LoginPage