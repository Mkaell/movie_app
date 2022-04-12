import React from 'react';
import './App.scss'
import 'swiper/swiper.min.css'
import { BrowserRouter } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import Navigation from './Routes/Navigation';
import { Header } from './components/Header';

import { createTheme, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { orange } from '@mui/material/colors';

import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';

const outerTheme = createTheme({
    palette: {
        primary: {
            main: orange[500],
        },
    },
});

const auth = getAuth();

export const UserContext = React.createContext(auth);


function App() {

    const [user, loading, error] = useAuthState(auth);


    if (loading) {
        return <Loader />
    }

    return (
        <BrowserRouter>
            <UserContext.Provider value={auth}>
                <ThemeProvider theme={outerTheme}>
                    <StyledEngineProvider injectFirst>
                        <Header />
                    </StyledEngineProvider>
                    <Navigation />
                </ThemeProvider>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
