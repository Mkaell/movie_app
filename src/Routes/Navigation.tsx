import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import CatalogPage from '../pages/CatalogPage';
import DetailPage from '../pages/detail/DetailPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/loginPage/LoginPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import RegisterPage from '../pages/RegisterPage';
import { NavigationPath } from './enumsNavigation'

const Navigation = () => {

    return (
        <Routes>
            <Route
                path='/'
                element={<HomePage />}
            />
            <Route
                path={NavigationPath.LOGIN}
                element={<LoginPage />}
            />
            <Route
                path={NavigationPath.REGISTRATION}
                element={<RegisterPage />}
            />
            <Route
                path={NavigationPath.PROFILE}
                element={<ProfilePage />}
            />
            <Route
                path={NavigationPath.CATEGORY}
                element={<CatalogPage />}
            />
            <Route
                path={NavigationPath.SEARCH}
                element={<CatalogPage />}
            />
            <Route
                path={NavigationPath.DETAIL}
                element={<DetailPage />}
            />

        </Routes>
    )
}

export default Navigation