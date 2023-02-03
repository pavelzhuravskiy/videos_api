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
  {
    id: 1,
    title: "The Green Mile",
    author: "Frank Darabont",
    canBeDownloaded: false,
    minAgeRestriction: 16,
    createdAt: "1999-12-06T00:00:00.000Z",
    publicationDate: "1999-12-06T08:00:00.000Z",
    availableResolutions: ["P144", "P1080"],
  },
];
const validResolutions = [
  "P144",
  "P240",
  "P360",
  "P480",
  "P720",
  "P1080",
  "P1440",
  "P2160",
];
const currentDate = new Date().toISOString();
const tomorrowDate = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString();
const errorObject = {
  errorsMessages: [
    {
      message: "ERROR",
      field: "On field ...",
    },
  ],
};
const qualityCheck = (arr: string[], arr2: string[]) => {
  return arr.every((res: string) => arr2.includes(res));
};

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
  const minAgeRestriction = req.body.minAgeRestriction;
  const availableResolutions = req.body.availableResolutions;
  const canBeDownloaded = req.body.canBeDownloaded;
  const newVideo: VideosType = {
    id: +new Date(),
    title: title,
    author: author,
    canBeDownloaded: canBeDownloaded,
    minAgeRestriction: minAgeRestriction,
    createdAt: currentDate,
    publicationDate: tomorrowDate,
    availableResolutions: availableResolutions,
  };

  // Validation

  if (
    author &&
    typeof author === "string" &&
    title &&
    typeof title === "string"
  ) {
    if (!canBeDownloaded || typeof canBeDownloaded === "boolean") {
      if (
        !minAgeRestriction ||
        (minAgeRestriction <= 18 && typeof minAgeRestriction === "number")
      ) {
        if (
          !availableResolutions ||
          qualityCheck(availableResolutions, validResolutions)
        ) {
          videosDataBase.push(newVideo);
          res.status(201).send(newVideo);
          return;
        }
      }
    }
  }
  res.status(400).send(errorObject);
});

// PUT
videosRouter.put("/:id", (req: Request, res: Response) => {
  const video = videosDataBase.find((video) => video.id === +req.params.id);
  if (video) {
    const id = +req.params.id;
    const title = req.body.title;
    const author = req.body.author;
    const availableResolutions = req.body.availableResolutions;
    const canBeDownloaded = req.body.canBeDownloaded;
    const minAgeRestriction = req.body.minAgeRestriction;
    const updatedVideo: VideosType = {
      id: id,
      title: title,
      author: author,
      canBeDownloaded: canBeDownloaded,
      minAgeRestriction: minAgeRestriction,
      createdAt: currentDate,
      publicationDate: tomorrowDate,
      availableResolutions: availableResolutions,
    };
    if (
      author &&
      typeof author === "string" &&
      author.length <= 20 &&
      title &&
      typeof title === "string" &&
      title.length <= 40
    ) {
      if (!canBeDownloaded || typeof canBeDownloaded === "boolean") {
        if (
          !minAgeRestriction ||
          (minAgeRestriction <= 18 && typeof minAgeRestriction === "number")
        ) {
          if (
            !availableResolutions ||
            (qualityCheck(availableResolutions, validResolutions) &&
              availableResolutions.length > 0)
          ) {
            video.title = title;
            video.author = author;
            video.availableResolutions = availableResolutions;
            video.canBeDownloaded = canBeDownloaded;
            video.minAgeRestriction = minAgeRestriction;
            res.sendStatus(201);
            return;
          }
        }
      }
    }
    res.status(400).send(errorObject);
  } else {
    res.sendStatus(404);
  }
});

// DELETE
videosRouter.delete("/:id", (req: Request, res: Response) => {
  const video = videosDataBase.find((video) => video.id === +req.params.id);
  if (video) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});