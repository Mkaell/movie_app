
import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import img from '../assets/first_icon.png'
import img2 from '../assets/second_icon.png'
import poster from '../assets/poster.png'
import { WatchList } from '../components/Watch-list';
import Loader from '../components/Loader/Loader';

import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth';

import './ProfilePage.scss'

const ProfilePage: FC = () => {
    const navigate = useNavigate()
    const auth = getAuth();
    const [user, loading] = useAuthState(auth)

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    return (
        <> {!loading ?
            <><div
                className="poster"
                style={{ backgroundImage: `url(${poster})` }}></div>
                <div className="mb-3 profile-content container">
                    <div className="profile-content__poster">
                        <div
                            className="profile-content__poster__img"
                            style={{ backgroundImage: `url(${img2})` }}></div>
                    </div>
                    <div className="profile-content__info">
                        <h1
                            className="title"
                            style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                {user?.email?.replace(/@.*/, '')}
                            </div>
                        </h1>
                        <p>Registered since: {user?.metadata.creationTime?.replace(/gmt/ig, "")}</p>
                        <div className="genres">

                        </div>

                        <div className="cast">
                            <div className="section__header">
                                <h2>Something</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="section mb-3">
                        <div className="section__header mb-2">
                            <h2>Watch List</h2>
                        </div>
                        <WatchList />
                    </div>
                </div></>
            : <Loader />}
        </>
    )
}

export default ProfilePage