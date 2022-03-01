import React from 'react'
import HeroSlide from '../components/Hero-slide/HeroSlide'
import MovieList from '../components/movie-list/MovieList'
import { Category, MovieType, TvType } from '../api/enumsTmdb'

const HomePage = () => {
    return (
        <>
            <HeroSlide />
            <div className="container">
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending Movies</h2>
                    </div>
                    <MovieList category={Category.movie} type={MovieType.popular} />
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated Movies</h2>
                    </div>
                    <MovieList category={Category.movie} type={MovieType.top_rated} />
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending TV</h2>
                    </div>
                    <MovieList category={Category.tv} type={TvType.popular} />
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated TV</h2>
                    </div>
                    <MovieList category={Category.tv} type={TvType.top_rated} />
                </div>
            </div>
        </>
    )
}

export default HomePage