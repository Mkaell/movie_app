import React from 'react';
import 'swiper/swiper.min.css'
import { BrowserRouter } from 'react-router-dom';
import './App.scss'

import Navigation from './config/Navigation';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { StyledEngineProvider } from '@mui/material';


function App() {
    return (
        <BrowserRouter>
            <StyledEngineProvider injectFirst>
                <Header />
            </StyledEngineProvider>
            <Navigation />
            <Footer />
        </BrowserRouter>

    );
}

export default App;
