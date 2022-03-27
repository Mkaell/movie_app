export enum Category {
    movie = 'movie',
    tv = 'tv'
}

export type CategoryStrings = keyof typeof Category;

export enum MovieType {
    upcoming = 'upcoming',
    popular = 'popular',
    top_rated = 'top_rated'
}

export type MovieTypeStrings = keyof typeof MovieType;

export enum TvType {
    popular = 'popular',
    top_rated = 'top_rated',
    on_the_air = 'on_the_air'
}

export type TvTypeStrings = keyof typeof TvType;