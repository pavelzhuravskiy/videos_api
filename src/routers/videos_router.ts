import { Request, Response, Router } from "express";

const videos = [
    {
        id: 0,
        title: "Star Wars: Episode III – Revenge of the Sith",
        author: "George Lucas",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2015-05-15T00:00:00.000Z",
        publicationDate: "2015-05-15T08:00:00.000Z",
        availableResolutions: [
            "P144"
        ]
    },
];

export const videosRouter = Router({});

videosRouter.get('/', (req: Request, res: Response) => {
    res.send(videos)
})