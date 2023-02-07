export type AvailableResolutions = string[];
export type VideosObjectType = {
    id: number;
    title: string;
    author: string;
    canBeDownloaded: boolean;
    minAgeRestriction: null | number;
    createdAt: string;
    publicationDate: string;
    availableResolutions: AvailableResolutions;
};

export type VideosArrayType = Array<VideosObjectType>