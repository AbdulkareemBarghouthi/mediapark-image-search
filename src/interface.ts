export interface ImageUrls {
    full: string;
    raw: string;
    regular: string;
    small: string;
    thumb: string;
}

export interface ImageResponse {
    urls: ImageUrls;
    links?: {
        download: string;
        download_location: string;
        html: string;
        self: string;
    }
    color: string;
    id: string;
    alt_description: string;
    liked_by_user: boolean;
    likes: number;
}

export interface userObject {
    access_token: string;
    name?: string;
    refresh_token?: string;
    scope?: string;
    token_type: string
}

export enum localStorageKeys {
    user = 'user',
    storedSearchQueries = "storedSearchQueries",
}