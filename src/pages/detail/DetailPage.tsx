import React, { FC, useContext, useEffect, useState } from 'react';
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


import './detail.scss';
import { UserContext } from '../../App';
import InfoList from './InfoList';

type IModalColor = AlertColor | undefined

const DetailPage: FC = () => {

    let { category, id } = useParams();

    const { currentUser } = useContext(UserContext);

    const [visibility, setVisibility] = useState<boolean>(true);
    const [valueModal, setValueModal] = useState<string>('');
    const [alertModal, setAlertModal] = useState<IModalColor>('error');
    const [open, setOpen] = useState<boolean>(false);
    const [item, setItem] = useState<any>();
    const [data, setData] = useState<any>();

    const docuRef = doc(db, `${currentUser?.email}/${currentUser?.uid}`);

    const handleClose = (reason?: string) => {

        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const changeStatesButton = (visibility: boolean, valueModal: string, coloModal: IModalColor, open: boolean) => {

        setVisibility(visibility);
        setValueModal(valueModal);
        setAlertModal(coloModal);
        setOpen(open);
    }

    useEffect(() => {

        const getDetail = async () => {

            // adding a database when opening
            const data = await getDoc(docuRef);
            setData(data);
            // check if it exists
            if (!data.exists()) {
                await setDoc(docuRef, { watchList: [] });
            }

            const response: any = await tmdbApi.detail(category, id, { params: {} });
            setItem(response);
            window.scrollTo(0, 0);

        }

        getDetail();

    }, [category, id]);

    // need attention 
    useEffect(() => {

        const isMovieInWatchList = async () => {

            try {

                const data = await getDoc(docuRef);

                const filterlist = data.data()?.watchList.filter(
                    (item: { id: string; }) => String(item.id) === id

                );

                if (filterlist.length > 0) {
                    setVisibility(false)
                } else {
                    setVisibility(true)
                }

            } catch (error) {
                console.error("Error: ", error);
            }
        }

        isMovieInWatchList();

    }, [id])

    useEffect(() => {
        console.log(visibility);
    })

    const addMovie = async () => {

        try {
            item.category = category
            await updateDoc(docuRef, {
                watchList: arrayUnion(item)
            });

            changeStatesButton(false, `${item.title || item.name} added to Watch List`, 'success', true);

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    const deleteMovie = async () => {
        try {

            const data = await getDoc(docuRef);

            const filterList = data.data()?.watchList.filter(
                (item: { id: string; }) => { return String(item.id) !== id }
            );

            await updateDoc(docuRef, { watchList: [...filterList] });

            changeStatesButton(true, `${item.title || item.name} removed to Watch List`, 'error', true);

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <>
            {
                item && data ? (
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
                                <div
                                    className="movie-content__info-title"
                                >
                                    <h2>
                                        {item.title || item.name}
                                    </h2>
                                    <div className='movie-content__vote'>
                                        <p style={{
                                            fontSize: '2.5rem',
                                            fontFamily: 'Montserrat'
                                        }}>{item.vote_average}</p>
                                    </div>
                                </div>
                                <div className="genres">
                                    {
                                        item.genres && item.genres.slice(0, 4).map((genre: { name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }, i: React.Key | null | undefined) => (
                                            <span key={i} className="genres__item">{genre.name}</span>
                                        ))
                                    }
                                </div>
                                <p>{item.overview}</p>

                                {
                                    currentUser ?
                                        visibility ?
                                            <Button color='success' sx={{ mb: '2rem' }} variant="contained" startIcon={<Add />} onClick={addMovie}>
                                                Add to Watch List
                                            </Button> :
                                            <Button color='error' sx={{ mb: '2rem' }} variant="contained" startIcon={<Remove />} onClick={deleteMovie}>
                                                Delete to Watch List
                                            </Button>
                                        : null
                                }

                                {
                                    item.release_date &&
                                    <InfoList icon={<DateRangeIcon />} title='Release date: ' info={item.release_date} />
                                }

                                {
                                    item.runtime &&
                                    <InfoList icon={<ShutterSpeedIcon />} title='Duration: ' info={item.runtime} />
                                }

                                {
                                    item.budget ?
                                        <InfoList icon={<PaidIcon />} title='Budget: $' info={item.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} /> : null
                                }

                                {
                                    item.first_air_date && item.last_air_date ?
                                        <InfoList icon={<DateRangeIcon />} info={`${item.first_air_date} - ${item.last_air_date}`} /> : null
                                }

                                {
                                    item.number_of_episodes &&
                                    <InfoList title='Number of episodes: ' info={item.number_of_episodes} />
                                }

                                {
                                    item.number_of_seasons &&
                                    <InfoList title='Number of seasons: ' info={item.number_of_seasons} />
                                }

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