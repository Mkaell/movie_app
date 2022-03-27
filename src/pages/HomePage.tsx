import { FC } from 'react'
import { Link } from 'react-router-dom'
import MovieList from '../components/movie-list/MovieList'
import { Category, MovieType, TvType } from '../api/enumsTmdb'
import { Footer } from '../components/Footer'
import { HeroSlide } from '../components/Hero-slide'

import { Button } from '@mui/material'


const HomePage: FC = () => {

    return (
        <>
            <HeroSlide />
            <div className="container">
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending Movies</h2>
                        <Link to="/movie">
                            <Button
                                variant="outlined"
                                sx={{ my: 2 }}
                            >
                                View more
                            </Button>
                        </Link>
                    </div>
                    <MovieList category={Category.movie} type={MovieType.popular} />
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated Movies</h2>
                        <Link to="/movie">
                            <Button
                                variant="outlined"
                                sx={{ my: 2 }}
                            >
                                View more
                            </Button>
                        </Link>
                    </div>
                    <MovieList category={Category.movie} type={MovieType.top_rated} />
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending TV</h2>
                        <Link to="/tv">
                            <Button
                                variant="outlined"
                                sx={{ my: 2 }}
                            >
                                View more
                            </Button>
                        </Link>
                    </div>
                    <MovieList category={Category.tv} type={TvType.popular} />
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated TV</h2>
                        <Link to="/tv">
                            <Button
                                variant="outlined"
                                sx={{ my: 2 }}
                            >
                                View more
                            </Button>
                        </Link>
                    </div>
                    <MovieList category={Category.tv} type={TvType.top_rated} />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default HomePage