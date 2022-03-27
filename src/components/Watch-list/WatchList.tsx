import { getAuth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import React, { FC, useContext, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { SwiperSlide, Swiper } from 'swiper/react';
import { UserContext } from '../../App';
import { db } from '../../firebase'
import MovieCard from '../movie-list/movie-card/MovieCard'

const WatchList: FC = () => {

    const { currentUser } = useContext(UserContext);

    const [items, setItems] = useState<any>([]);

    const docuRef = doc(db, `${currentUser?.email}/${currentUser?.uid}`);

    useEffect(() => {
        (async () => {
            // поисковый документ
            const data = await getDoc(docuRef);
            // проверить, существует ли он
            if (data.exists()) {
                // существует
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