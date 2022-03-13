import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PaidIcon from '@mui/icons-material/Paid';
import DateRangeIcon from '@mui/icons-material/DateRange';
import StarRateIcon from '@mui/icons-material/StarRate';
import tmdbApi from '../../api/apiTmdb';
import apiConfig from '../../api/apiConfig';
import ShutterSpeedIcon from '@mui/icons-material/ShutterSpeed';
import './detail.scss';
import CastList from './CastList';
import VideoList from './VideoList';
import SendIcon from '@mui/icons-material/Send';

import MovieList from '../../components/movie-list/MovieList';
import Loader from '../../components/Loader/Loader';
import { Button } from '@mui/material';
import { addDoc, collection, setDoc, doc, updateDoc, arrayUnion, getDoc, deleteField, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase'
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const DetailPage = () => {
    let { category, id } = useParams();
    const auth = getAuth();
    const [user, loading, error] = useAuthState(auth);
    const [item, setItem] = useState<any>();
    const docuRef = doc(db, `MOVIE_DATABASE/${user?.email}`);
    console.log(auth);

    useEffect(() => {
        const getDetail = async () => {
            const response: any = await tmdbApi.detail(category, id, { params: {} });
            setItem(response);
            window.scrollTo(0, 0);



            // добаваление базы при открытии 
            const data = await getDoc(docuRef);
            // проверить, существует ли он
            if (!data.exists()) {
                await setDoc(docuRef, { watchList: [] });
                alert('done')
            } else {
                alert('already have')
            }

        }
        getDetail();
    }, [category, id]);

    // async function findDocumentOrCreateDocument(idUser: any) {
    //     //создать ссылку на документ
    //     const docuRef = doc(db, `MOVIE_DATABASE/${idUser}`);
    //     // поисковый документ
    //     const data = await getDoc(docuRef);
    //     // проверить, существует ли он
    //     if (data.exists()) {
    //         // существует
    //         const infoDocument = data.data();
    //         return infoDocument.watchList;
    //     } else {
    //         // не существует
    //         await setDoc(docuRef, { watchList: [] });
    //         const data = await getDoc(docuRef);
    //         const infoDocument = data.data();
    //         return infoDocument?.watchList;
    //     }
    // }

    const sendMessage = async () => {
        try {
            item.category = category
            await updateDoc(docuRef, {
                watchList: arrayUnion(item)
            });
            alert('Добавлен');

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    // const ListadoTareas = ({ arrayTareas, correoUsuario, setArrayTareas }) => {
    //     async function eliminarTarea(idTareaAEliminar) {
    //       // crear nuevo array de tareas
    //       const nvoArrayTareas = arrayTareas.filter(
    //         (objetoTarea) => objetoTarea.id !== idTareaAEliminar
    //       );
    //       // actualizar base de datos
    //       const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
    //       updateDoc(docuRef, { tareas: [...nvoArrayTareas] });
    //       //actualizar state
    //       setArrayTareas(nvoArrayTareas);
    //     }
    const deleteMessage = async () => {
        try {
            const data = await getDoc(docuRef);
            const newList = data.data()
            console.log(newList?.watchList);

            const filterlist = newList?.watchList.filter(
                (item: { id: any; }) => { return item.id != id }

            );
            await updateDoc(docuRef, { watchList: [...filterlist] });
            console.log(filterlist);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    return (
        <>
            {
                item ? (
                    <>
                        <div className="banner" style={{ backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})` }}></div>
                        <div className="mb-3 movie-content container">
                            <div className="movie-content__poster">
                                <div className="movie-content__poster__img" style={{ backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})` }}></div>
                            </div>
                            <div className="movie-content__info">
                                <h1 className="title" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        {item.title || item.name}
                                    </div>
                                    <div style={{
                                        display: 'flex', alignItems: 'center', width: '4rem',
                                        height: '4rem', border: '2px solid #ffd800',
                                        borderRadius: '50%', justifyContent: 'center'
                                    }}>
                                        <p style={{
                                            fontSize: '2rem',
                                        }}>{item.vote_average}</p>
                                    </div>
                                </h1>
                                <div className="genres">
                                    {
                                        item.genres && item.genres.slice(0, 5).map((genre: { name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }, i: React.Key | null | undefined) => (
                                            <span key={i} className="genres__item">{genre.name}</span>
                                        ))
                                    }
                                </div>

                                <p className="overview">{item.overview}</p>
                                <Button variant="contained" disableElevation endIcon={<SendIcon />} onClick={sendMessage}>
                                    Disable elevation
                                </Button>
                                <Button variant="contained" disableElevation endIcon={<SendIcon />} onClick={deleteMessage}>
                                    Disable
                                </Button>
                                {item.release_date ? <div style={{ display: 'flex' }}>
                                    <DateRangeIcon /> <p style={{ display: 'inline' }}>Release date: {item.release_date}</p>
                                </div> : null}

                                {item.runtime ? <div style={{ display: 'flex' }}>
                                    <ShutterSpeedIcon /> <p style={{ display: 'inline' }}>Duration: {item.runtime}m</p>
                                </div> : null}

                                {item.budget ? <div style={{ display: 'flex' }}>
                                    <PaidIcon /> <p style={{ display: 'inline' }}> Budget: ${item.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</p>
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
                    </>
                ) : <Loader />
            }
        </>
    );
}


export default DetailPage