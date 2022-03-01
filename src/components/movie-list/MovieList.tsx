import React, { useState, useEffect } from 'react';

import './movie-list.scss';

import { SwiperSlide, Swiper } from 'swiper/react';
import { Link } from 'react-router-dom';


import { Category } from '../../api/enumsTmdb';
import tmdbApi from '../../api/apiTmdb';


import MovieCard from './movie-card/MovieCard';

const MovieList = (props: any) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response: any = null;
            const params = {};

            if (props.type !== 'similar') {
                switch (props.category) {
                    case Category.movie:
                        response = await tmdbApi.getMoviesList(props.type, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, { params });
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id);
            }
            setItems(response.results);
        }
        getList();
    }, []);

    return (
        <div className="movie-list">
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
            >
                {
                    items.map((item, i) => (
                        <SwiperSlide key={i}>
                            <MovieCard item={item} category={props.category} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}


export default MovieList;