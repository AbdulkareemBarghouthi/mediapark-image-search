import { ImageResponse } from "../../interface";

export interface ResultsGridProps {
    images?: ImageResponse[];
    isUserLoggedIn: boolean;
    onUserLikeOrDislike?: ()=> void;
}