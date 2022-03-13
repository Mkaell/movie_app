import React, { useState, useEffect } from 'react';

import './movie-list.scss';

import { SwiperSlide, Swiper } from 'swiper/react';



import { Category } from '../../api/enumsTmdb';
import tmdbApi from '../../api/apiTmdb';


import MovieCard from './movie-card/MovieCard';
import Loader from '../Loader/Loader';


const MovieList = (props?: any) => {

    const [items, setItems] = useState<any>();

    useEffect(() => {
        const getList = async () => {
            let response: any = null;
            const params = {};

            if (props.type !== 'recommendations') {
                switch (props.category) {
                    case Category.movie:
                        response = await tmdbApi.getMoviesList(props.type, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, { params });
                }
            } else {
                response = await tmdbApi.recommendations(props.category, props.id);
            }
            setItems(response.results);


        }
        getList();
    }, [props.category, props.id, props.type]);


    return (
        <div className="movie-list">
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
            >
                {items ?
                    items.map((item: any, i: React.Key | null | undefined) => (
                        <SwiperSlide key={i}>
                            <MovieCard item={item} category={props.category} />
                        </SwiperSlide>
                    )) :
                    <Loader />
                }
            </Swiper>
        </div>
    );
}


export default MovieList;
