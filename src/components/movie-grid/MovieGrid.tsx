import React, { useState, useEffect, useCallback, FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './movie-grid.scss';

import MovieCard from '../movie-list/movie-card/MovieCard';
import Button, { OutlineButton } from '../button/Button';
import Input from '../input/Input'

import tmdbApi from '../../api/apiTmdb';
import { Category, MovieType, TvType } from '../../api/enumsTmdb';

interface IMovieGrid {
    children?: React.ReactNode;
    category?: string;
}
const MovieGrid: FC<IMovieGrid> = (props) => {

    const [items, setItems] = useState<any[]>([]);

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const { keyword } = useParams();
    console.log(props.category);

    useEffect(() => {
        const getList = async () => {
            let response: any = null;
            if (keyword === undefined) {
                const params = {};
                switch (props.category) {
                    case Category.movie:
                        response = await tmdbApi.getMoviesList(MovieType.upcoming, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvList(TvType.popular, { params });
                }
            } else {
                const params = {
                    query: keyword
                }
                response = await tmdbApi.search(props.category, { params });
            }
            setItems(response.results.filter((_word: any, i: number) => i <= 17));

            setTotalPage(response.total_pages);
        }
        getList();
    }, [props.category, keyword]);
    // console.log(items);
    const loadMore = async () => {
        let response: any = null;
        if (keyword === undefined) {
            const params = {
                page: page + 1
            };
            switch (props.category) {
                case Category.movie:
                    response = await tmdbApi.getMoviesList(MovieType.upcoming, { params });
                    break;
                default:
                    response = await tmdbApi.getTvList(TvType.popular, { params });
            }
        } else {
            const params = {
                page: page + 1,
                query: keyword
            }
            response = await tmdbApi.search(props.category, { params });
        }
        setItems([...items, ...response.results]);
        setPage(page + 1);
    }

    return (
        <>
            <div className="section mb-3">
                <MovieSearch category={props.category} keyword={keyword} />
            </div>
            <div className="movie-grid">
                {
                    items.map((item, i) => <MovieCard category={props.category} item={item} key={i} />)
                }
            </div>
            {
                page < totalPage ? (
                    <div className="movie-grid__loadmore">
                        <OutlineButton onClick={loadMore}>Load more</OutlineButton>
                    </div>
                ) : null
            }
        </>
    );
}


interface IMovieSearch {
    children?: React.ReactNode;
    category?: string;
    keyword?: string;
}

const MovieSearch: FC<IMovieSearch> = (props) => {

    const navigate = useNavigate();

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

    const goToSearch = useCallback(
        () => {
            if (keyword.trim().length > 0) {
                navigate(`/${props.category}/search/${keyword}`);
                setKeyword('')
            }
        },
        [keyword, props.category, navigate]
    );

    useEffect(() => {
        const enterEvent = (e: { preventDefault: () => void; keyCode: number; }) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        }
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        };
    }, [keyword, goToSearch]);

    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e: { target: { value: any; }; }) => setKeyword(e.target.value)}
            />
            <Button className="small" onClick={goToSearch}>Search</Button>
        </div>
    )
}

export default MovieGrid;
