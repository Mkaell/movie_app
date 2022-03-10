import React, { useState, useEffect, useRef, FC } from 'react';

import { useParams } from 'react-router';
import { CategoryStrings } from '../../api/enumsTmdb';
import tmdbApi from '../../api/apiTmdb';

// посмотреть Typescript

const VideoList = (props: any) => {

    const { category } = useParams();

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            const res: any = await tmdbApi.getVideos(category, props.id);
            setVideos(res.results.slice(0, 2));
        }
        getVideos();
    }, [category, props.id]);
    console.log(videos);

    return (
        <>
            {
                videos.map((item, i) => (

                    <Video key={i} item={item} />
                ))
            }
        </>
    );
}

const Video = (props: any) => {

    const item = props.item;
    console.log(item);

    const iframeRef: any = useRef(null);

    useEffect(() => {
        const height = iframeRef.current.offsetWidth * 9 / 16 + 'px';
        iframeRef.current.setAttribute('height', height);
    }, []);

    return (
        <div className="video">
            <div className="video__title">
                <h2>{item.name}</h2>
            </div>
            <iframe
                src={`https://www.youtube.com/embed/${item.key}`}
                ref={iframeRef}
                width="100%"
                title="video"
            ></iframe>
        </div>
    )
}

export default VideoList;
