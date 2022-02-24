interface IApiConfig {
    baseUrl: string;
    apiKey: string;
    w500Image(posterPath: string): string;
    originalImage(posterPath: string): string;
}

const apiConfig: IApiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '2129af6ad8e13414069c9da4e190cbeb',
    w500Image: (posterPath) => `https://image.tmdb.org/t/p/w500/${posterPath}`,
    originalImage: (posterPath) => `https://image.tmdb.org/t/p/original/${posterPath}`
}

export default apiConfig;