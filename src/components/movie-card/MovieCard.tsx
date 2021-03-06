import React from 'react';

import './movie-card.scss';

import { Link } from 'react-router-dom';
import noBg from '../../assets/no-poster-available.jpg';
import { Category, CategoryStrings } from '../../api/enumsTmdb';
import apiConfig from '../../api/apiConfig';
import StarIcon from '@mui/icons-material/Star';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const MovieCard = (props: any) => {

    const category: CategoryStrings = props.category
    const item = props.item;

    const link = `/${Category[category]}/${item.id}`;
    let bg = '';

    if (item.poster_path || item.backdrop_path) {
        bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
    } else {
        bg = noBg
    }

    return (
        <Link to={link}>
            <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
                <PlayCircleIcon className='icon-play' sx={{ fontSize: '4rem' }} />
            </div>
            <div className='movie-card_descr'>
                {
                    item.vote_average ?
                        <div className='movie-card_vote'>{item.vote_average.toFixed(1)}<StarIcon color='warning' /></div>
                        : null
                }
                <h3>{item.title || item.name}</h3>
            </div>
        </Link>
    );
}

export default MovieCard;
