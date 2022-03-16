import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CastList from './CastList';
import VideoList from './VideoList';
import MovieList from '../../components/movie-list/MovieList';
import Loader from '../../components/Loader/Loader';
import tmdbApi from '../../api/apiTmdb';
import apiConfig from '../../api/apiConfig';
import { AlertModal } from '../../components/Alert';

import PaidIcon from '@mui/icons-material/Paid';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ShutterSpeedIcon from '@mui/icons-material/ShutterSpeed';
import { AlertColor, Button } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

import { setDoc, doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '../../firebase'
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import './detail.scss';

type IModalColor = AlertColor | undefined

const DetailPage: FC = () => {

    let { category, id } = useParams();
    const auth = getAuth();
    const [visibility, setVisibility] = useState<boolean>(true);
    const [valueModal, setValueModal] = useState<string>('');
    const [alertModal, setAlertModal] = useState<IModalColor>('error');
    const [open, setOpen] = useState<boolean>(false);
    const [user] = useAuthState(auth);
    const [item, setItem] = useState<any>();


    const handleClose = (reason?: string) => {

        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        const getDetail = async () => {

            const response: any = await tmdbApi.detail(category, id, { params: {} });
            setItem(response);
            window.scrollTo(0, 0);

            const docuRef = doc(db, `MOVIE_DATABASE/${user?.email}`);

            // adding a database when opening
            const data = await getDoc(docuRef);
            // check if it exists
            if (!data.exists()) {
                await setDoc(docuRef, { watchList: [] });
            }

        }
        getDetail();
    }, [category, id]);

    // need attention 
    useEffect(() => {

        const getData = async () => {

            // use two times
            const docuRef = doc(db, `MOVIE_DATABASE/${user?.email}`);

            const data = await getDoc(docuRef);
            const newList = data.data()

            const filterlist = newList?.watchList.filter(
                (item: { id: any; }) => { return item.id == id }

            );

            if (filterlist.length > 0) {
                setVisibility(false)
            } else {
                setVisibility(true)
            }
        }
        getData();
    }, [])

    const addMovie = async () => {
        try {

            const docuRef = doc(db, `MOVIE_DATABASE/${user?.email}`);
            item.category = category

            await updateDoc(docuRef, {
                watchList: arrayUnion(item)
            });

            setVisibility(false)
            setValueModal(`${item.title || item.name} added to Watch List`)
            setAlertModal('success')
            setOpen(true)

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const deleteMovie = async () => {
        try {

            const docuRef = doc(db, `MOVIE_DATABASE/${user?.email}`);
            const data = await getDoc(docuRef);
            const newList = data.data()

            const filterlist = newList?.watchList.filter(
                (item: { id: any; }) => { return item.id != id }

            );

            await updateDoc(docuRef, { watchList: [...filterlist] });

            setVisibility(true)
            setValueModal(`${item.title || item.name} removed to Watch List`)
            setAlertModal('error')
            setOpen(true)

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <>
            {
                item ? (
                    <>
                        <div
                            className="banner"
                            style={{ backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})` }}>
                        </div>
                        <div className="mb-3 movie-content container">
                            <div className="movie-content__poster">
                                <div
                                    className="movie-content__poster__img"
                                    style={{ backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})` }}>
                                </div>
                            </div>
                            <div className="movie-content__info">
                                <h1 className="title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        {item.title || item.name}
                                    </div>
                                    <div style={{
                                        display: 'flex', alignItems: 'center', width: '5rem',
                                        height: '5rem', border: '3px solid #ffd800',
                                        borderRadius: '50%', justifyContent: 'center'
                                    }}>
                                        <p style={{
                                            fontSize: '2.5rem',
                                            fontFamily: 'Montserrat'
                                        }}>{item.vote_average}</p>
                                    </div>
                                </h1>
                                <div className="genres">
                                    {
                                        item.genres && item.genres.slice(0, 4).map((genre: { name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }, i: React.Key | null | undefined) => (
                                            <span key={i} className="genres__item">{genre.name}</span>
                                        ))
                                    }
                                </div>

                                <p className="ovembview">{item.overview}</p>

                                {user ?
                                    visibility ?
                                        <Button color='success' sx={{ mb: '2rem' }} variant="contained" startIcon={<Add />} onClick={addMovie}>
                                            Add to Watch List
                                        </Button> :
                                        <Button color='error' sx={{ mb: '2rem' }} variant="contained" startIcon={<Remove />} onClick={deleteMovie}>
                                            Delete to Watch List
                                        </Button>
                                    : null
                                }


                                {item.release_date ? <div style={{ display: 'flex' }}>
                                    <DateRangeIcon /> <p style={{ display: 'inline', fontFamily: 'Montserrat' }}>Release date: {item.release_date}</p>
                                </div> : null}

                                {item.runtime ? <div style={{ display: 'flex' }}>
                                    <ShutterSpeedIcon /> <p style={{ display: 'inline', fontFamily: 'Montserrat' }}>Duration: {item.runtime}m</p>
                                </div> : null}

                                {item.budget ? <div style={{ display: 'flex' }}>
                                    <PaidIcon /> <p style={{ display: 'inline', fontFamily: 'Montserrat' }}> Budget: ${item.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</p>
                                </div> : null}


                                <div className="cast">
                                    <div className="section__header">
                                        <h2>Casts</h2>
                                    </div>
                                    <CastList id={item.id} />
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="section mb-3">
                                <VideoList id={item.id} />
                            </div>
                            <div className="section mb-3">
                                <div className="section__header mb-2">
                                    <h2>Recommendations</h2>
                                </div>
                                <MovieList category={category} type="recommendations" id={item.id} />
                            </div>
                        </div>
                        <AlertModal open={open} handleClose={handleClose} children={valueModal} severity={alertModal} />
                    </>
                ) : <Loader />
            }
        </>
    );
}


export default DetailPage