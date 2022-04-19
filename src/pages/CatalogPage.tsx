import React from 'react'
import { useParams } from 'react-router';

import { Category as cate } from '../api/enumsTmdb';
import MovieGrid from '../components/movie-grid/MovieGrid';
import PageHeader from '../components/page-header/PageHeader';


const CatalogPage = () => {
    const { category } = useParams();

    return (
        <>
            <PageHeader>
                {category === cate.movie ? 'Movies' : 'TV Series'}
            </PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid category={category} />
                </div>
            </div>
        </>
    );
}

export default CatalogPage