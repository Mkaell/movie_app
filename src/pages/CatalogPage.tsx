import React from 'react'
import { useParams } from 'react-router';

import { PageHeader } from '../components/Page-header';

import { Category as cate } from '../api/enumsTmdb';
import { MovieGrid } from '../components/Movie-grid';


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