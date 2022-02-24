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
    getVideos: (cate: CategoryStrings, id: number) => {
        const url = Category[cate] + '/' + id + '/videos';
        return axiosConfig.get(url, { params: {} });
    },
    search: (cate: CategoryStrings, params: object) => {
        const url = 'search/' + Category[cate];
        return axiosConfig.get(url, params);
    },
    detail: (cate: CategoryStrings, id: number, params: object) => {
        const url = Category[cate] + '/' + id;
        return axiosConfig.get(url, params);
    },
    credits: (cate: CategoryStrings, id: number) => {
        const url = Category[cate] + '/' + id + '/credits';
        return axiosConfig.get(url, { params: {} });
    },
    similar: (cate: CategoryStrings, id: number) => {
        const url = Category[cate] + '/' + id + '/similar';
        return axiosConfig.get(url, { params: {} });
    },
}

export default tmdbApi;