import { getAuth } from 'firebase/auth';
import React, { useEffect } from 'react'
import img from '../assets/first_icon.png'
import img2 from '../assets/second_icon.png'
import { useAuthState } from 'react-firebase-hooks/auth'
import './ProfilePage.scss'
import poster from '../assets/poster.png'
import { useNavigate } from 'react-router-dom';
import MovieList from '../components/movie-list/MovieList';
import { WatchList } from '../components/favorite-list';
import Loader from '../components/Loader/Loader';

const ProfilePage = () => {
    const navigate = useNavigate()
    const auth = getAuth();
    const [user, loading, error] = useAuthState(auth)


    useEffect(() => {
        if (!auth) {
            navigate('/login')
        }
    }, [auth, navigate])
    return (
        <> {!loading ?
            <><div className="poster" style={{ backgroundImage: `url(${poster})` }}></div><div className="mb-3 profile-content container">
                <div className="profile-content__poster">
                    <div className="profile-content__poster__img" style={{ backgroundImage: `url(${img2})` }}></div>
                </div>
                <div className="profile-content__info">
                    <h1 className="title" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            {user?.email?.replace(/@.*/, '')}
                        </div>
                    </h1>
                    <p>Registered since: {user?.metadata.creationTime?.replace(/gmt/ig, "")}</p>
                    <div className="genres">

                    </div>

                    <div className="cast">
                        <div className="section__header">
                            <h2>Casts</h2>
                        </div>

                    </div>
                </div>
            </div><div className="container">
                    <div className="section mb-3">

                    </div>
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