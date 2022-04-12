export enum NavigationPath {
    LOGIN = '/login',
    REGISTRATION = '/registration',
    PROFILE = '/profile',
    CATEGORY = '/:category',
    SEARCH = ':category/search/:keyword',
    DETAIL = '/:category/:id',
}