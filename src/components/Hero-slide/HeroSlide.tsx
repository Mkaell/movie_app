import React, { useState, useEffect, FC } from 'react';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';


import tmdbApi from '../../api/apiTmdb';
import { MovieType } from '../../api/enumsTmdb';
import apiConfig from '../../api/apiConfig';

import './hero-slide.scss';

import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';


const HeroSlide: FC = () => {

    SwiperCore.use([Autoplay]);

    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {

        const getMovies = async () => {
            const params = { page: 1 }
            try {
                const response: any = await tmdbApi.getMoviesList(MovieType.popular, { params });
                setMovieItems(response.results.slice(0, 7));
                console.log(response);
            } catch {
                console.log('error');
            }
        }
        getMovies();
    }, []);

    return (
        <div className="hero-slide">
            <Swiper
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
            // autoplay={{ delay: 5000 }}
            >
                {
                    movieItems.map((item, i) => (
                        <SwiperSlide key={i}>
                            {({ isActive }) => (
                                <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}

const HeroSlideItem = (props: any) => {

    const { item, className } = props;
    const navigate = useNavigate();
    // think about optimization
    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);


    return (
        <div
            className={`hero-slide__item ${className}`}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button
                            onClick={() => navigate('/movie/' + item.id)}
                            variant="contained"
                            sx={{ my: 2, fontSize: '1.2rem', borderRadius: '10px', fontFamily: 'Raleyway' }}
                        >
                            Watch Now
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default HeroSlide;
