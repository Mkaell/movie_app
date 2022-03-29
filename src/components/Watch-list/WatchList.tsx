import React, { FC, useContext, useEffect, useState } from 'react'
import MovieCard from '../movie-list/movie-card/MovieCard'
import { SwiperSlide, Swiper } from 'swiper/react';
import { UserContext } from '../../App';

import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'


const WatchList: FC = () => {

    const { currentUser } = useContext(UserContext);

    const [items, setItems] = useState<any>([]);



    useEffect(() => {
        (async () => {

            const docuRef = doc(db, `${currentUser?.email}/${currentUser?.uid}`);
            const data = await getDoc(docuRef);

            if (data.exists()) {

                const infoDocument = data.data();
                setItems(infoDocument.watchList);
            }
        })()

    }, [])

    return (
        <div className="movie-list">
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
            >
                {
                    items.map((item: { category: any; }, i: React.Key | null | undefined) => (
                        <SwiperSlide key={i}>
                            <MovieCard item={item} category={item.category} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default WatchList