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

import MovieList from '../../components/movie-list/MovieList';


const DetailPage = () => {
    let { category, id } = useParams();


    const [item, setItem] = useState<any>();

    useEffect(() => {
        const getDetail = async () => {
            const response: any = await tmdbApi.detail(category, id, { params: {} });
            setItem(response);
            window.scrollTo(0, 0);
        }
        getDetail();
    }, [category, id]);
    console.log(item);
    return (
        <>
            {
                item && (
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
                )
            }
        </>
    );
}


export default DetailPage