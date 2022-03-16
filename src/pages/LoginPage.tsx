import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Form } from '../components/Form';
import './LoginPage.scss'
import { ParticlesBackground } from '../components/Particles';



const LoginPage = () => {
    const navigate = useNavigate()
    const auth = getAuth();

    const handleLogin = async (email: any, password: any) => {
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
            <div>
                <div className="login-container">
                    <Form
                        title='Log in'
                        handleClick={handleLogin}
                        handleLoginGoogle={handleLoginGoogle} />
                    <p>
                        Don't have an account?
                        <Link
                            to='/registration'
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