import React from 'react'
import { Route, Routes } from 'react-router-dom';
import CatalogPage from '../pages/CatalogPage';
import DetailPage from '../pages/detail/DetailPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';

const Navigation = () => {
    return (
        <Routes>
            <Route
                path='/'
                element={<HomePage />}
            />
            <Route
                path='/login'
                element={<LoginPage />}
            />
            <Route
                path='/:category'
                element={<CatalogPage />}
            />
            <Route
                path='/:category/search/:keyword'
                element={<CatalogPage />}
            />
            <Route
                path='/:category/:id'
                element={<DetailPage />}
            />

        </Routes>
    )
}

export default Navigation