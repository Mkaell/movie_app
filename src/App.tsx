import React from 'react';
import 'swiper/swiper.min.css'
import { BrowserRouter } from 'react-router-dom';
import './App.scss'

import Navigation from './config/Navigation';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { createTheme, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { orange } from '@mui/material/colors';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import Loader from './components/Loader/Loader';


const outerTheme = createTheme({
    palette: {
        primary: {
            main: orange[500],
        },
    },
});
function App() {
    const auth = getAuth();
    const [user, loading, error] = useAuthState(auth);
    if (loading) {
        return <Loader />
    }

    return (
        <BrowserRouter>

            <ThemeProvider theme={outerTheme}>
                <StyledEngineProvider injectFirst>
                    <Header />
                </StyledEngineProvider>
                <Navigation />
                <Footer />
            </ThemeProvider>

        </BrowserRouter>

    );
}

export default App;
