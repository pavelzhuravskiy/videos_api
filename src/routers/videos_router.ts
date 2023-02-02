import { Request, Response, Router } from "express";

export const videosRouter = Router({});

type AvailableResolutions = string[];

type VideosType = {
  id: number;
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: null | number;
  createdAt: string;
  publicationDate: string;
  availableResolutions: AvailableResolutions;
};

const videosDataBase: VideosType[] = [
  {
    id: 0,
    title: "Star Wars: Episode III – Revenge of the Sith",
    author: "George Lucas",
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: "2015-05-15T00:00:00.000Z",
    publicationDate: "2015-05-15T08:00:00.000Z",
    availableResolutions: ["P144"],
  },
];

// GET without URI params
videosRouter.get("/", (req: Request, res: Response) => {
  res.send(videosDataBase);
});

// GET with URI params
videosRouter.get("/:id", (req: Request, res: Response) => {
  const video = videosDataBase.find((video) => video.id === +req.params.id);
  if (video) {
    res.send(video);
  } else {
    res.sendStatus(404);
  }
});

// POST
videosRouter.post("/", (req: Request, res: Response) => {
  const title = req.body.title;
  const author = req.body.author;
  const availableResolutions = req.body.availableResolutions;

  const newVideo: VideosType = {
    id: +new Date(),
    title: title,
    author: author,
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date().toISOString(),
    availableResolutions: availableResolutions,
  };
  videosDataBase.push(newVideo);
  res.status(201).send(newVideo);
});