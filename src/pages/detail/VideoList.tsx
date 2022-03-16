import React, { useState, useEffect, useRef, FC } from 'react';
import { useParams } from 'react-router';
import tmdbApi from '../../api/apiTmdb';

interface IVideoList {
    id: number,
    children?: React.ReactNode
}


const VideoList: FC<IVideoList> = ({ id }): JSX.Element => {

    const { category } = useParams();
    const [videos, setVideos] = useState<object[]>([]);

    useEffect(() => {
        const getVideos = async () => {
            const res: any = await tmdbApi.getVideos(category, id);
            console.log(res);

            setVideos(res.results.slice(0, 2));
        }
        getVideos();
    }, [category, id]);

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
interface IVideoObject {
    name?: string,
    key?: number,
    children?: React.ReactNode
}
interface IVideo {
    key?: React.Key | null | undefined
    item: IVideoObject,
    children?: React.ReactNode
}

const Video: FC<IVideo> = ({ item }) => {

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
