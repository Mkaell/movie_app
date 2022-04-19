interface IApiConfig {
    baseUrl: string;
    apiKey: string;
    w500Image(posterPath: string): string;
    originalImage(posterPath: string): string;
}

const apiConfig: IApiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '68bf2f1e148e557ae422380ea108deb9',
    w500Image: (posterPath) => `https://image.tmdb.org/t/p/w500/${posterPath}`,
    originalImage: (posterPath) => `https://image.tmdb.org/t/p/original/${posterPath}`
}

export default apiConfig;