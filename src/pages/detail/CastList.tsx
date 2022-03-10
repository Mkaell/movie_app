import React, { useState, useEffect, FC } from 'react';

import { useParams } from 'react-router';

import tmdbApi from '../../api/apiTmdb';
import apiConfig from '../../api/apiConfig';

interface ICastList {
    id: number
}

// посмотреть typescript
const CastList: FC<ICastList> = (props: any) => {

    const { category } = useParams();

    const [casts, setCasts] = useState<any[]>([]);

    useEffect(() => {
        const getCredits = async () => {
            const res: any = await tmdbApi.credits(category, props.id);
            setCasts(res.cast.slice(0, 5));
            console.log(res);
        }
        getCredits();


    }, [category, props.id]);

    return (
        <div className="casts">
            {
                casts.map((item, i) => (
                    <div key={i} className="casts__item">
                        <div className="casts__item__img" style={{ backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})` }}></div>
                        <p className="casts__item__name">{item.name}</p>
                    </div>
                ))
            }
        </div>
    );
}

export default CastList;
