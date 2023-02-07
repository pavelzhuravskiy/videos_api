import {VideosObjectType} from "../types/videos_types";

export const deleteAllVideos = (arr: Array<VideosObjectType>) => {
    return arr.splice(0, arr.length);
}