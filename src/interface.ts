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
}