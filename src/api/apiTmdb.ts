import axiosConfig from "./axiosConfig";
import { Category, CategoryStrings, MovieType, MovieTypeStrings, TvType, TvTypeStrings } from "./enumsTmdb";



const tmdbApi = {
    getMoviesList: (type: MovieTypeStrings, params: object) => {
        const url = 'movie/' + MovieType[type];
        return axiosConfig.get(url, params);
    },
    getTvList: (type: TvTypeStrings, params: object) => {
        const url = 'tv/' + TvType[type];
        return axiosConfig.get(url, params);
    },
    // useParams
    getVideos: (cate: string | undefined, id: number) => {
        const url = cate + '/' + id + '/videos';
        return axiosConfig.get(url, { params: {} });
    },
    search: (cate: string | undefined, params: object) => {
        const url = 'search/' + cate;
        return axiosConfig.get(url, params);
    },
    detail: (cate: string | undefined, id: string | undefined, params: object) => {
        const url = cate + '/' + id;
        return axiosConfig.get(url, params);
    },
    // useParams
    credits: (cate: string | undefined, id: number) => {
        const url = cate + '/' + id + '/credits';
        return axiosConfig.get(url, { params: {} });
    },
    recommendations: (cate: CategoryStrings, id: number) => {
        const url = Category[cate] + '/' + id + '/recommendations';
        return axiosConfig.get(url, { params: {} });
    },
}

export default tmdbApi;