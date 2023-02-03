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
type ErrorMessageType = {
  errorsMessages: [
    {
      message: string;
      field: string;
    }
  ];
};

const videosDataBase: VideosType[] = [];
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
const errorObject: ErrorMessageType = {
  errorsMessages: [
    {
      message: "ERROR",
      field: "in field",
    },
  ],
};

const qualityCheck = (arr: string[], arr2: string[]) => {
  return arr.every((res: string) => arr2.includes(res));
};

// GET without URI params
videosRouter.get("/", (req: Request, res: Response) => {
  res.json(videosDataBase);
});

// GET with URI params
videosRouter.get("/:id", (req: Request, res: Response) => {
  const video = videosDataBase.find((video) => video.id === +req.params.id);
  if (video) {
    res.json(video);
    return;
  }
  res.sendStatus(404);
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
    canBeDownloaded: canBeDownloaded || false,
    minAgeRestriction: minAgeRestriction || null,
    createdAt: currentDate,
    publicationDate: tomorrowDate,
    availableResolutions: availableResolutions || ["P1080"],
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
          res.status(201).json(newVideo);
          return;
        }
      }
    }
  }
  res.status(400).json(errorObject);
});

// PUT
videosRouter.put("/:id", (req: Request, res: Response) => {
  const video = videosDataBase.find((video) => video.id === +req.params.id);
  if (video) {
    const title = req.body.title;
    const author = req.body.author;
    const availableResolutions = req.body.availableResolutions;
    const canBeDownloaded = req.body.canBeDownloaded;
    const minAgeRestriction = req.body.minAgeRestriction;
    const publicationDate = req.body.publicationDate;
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
            if (!publicationDate || typeof publicationDate === "string") {
              video.title = title;
              video.author = author;
              video.availableResolutions = availableResolutions || ["P1080"];
              video.canBeDownloaded = canBeDownloaded || false;
              video.minAgeRestriction = minAgeRestriction || null;
              video.publicationDate = publicationDate || tomorrowDate;
              res.status(204).json(video);
              return;
            }
          }
        }
      }
    }
    res.status(400).json(errorObject);
  }
  res.sendStatus(404);
});

// DELETE
videosRouter.delete("/:id", (req: Request, res: Response) => {
  for (let i = 0; i < videosDataBase.length; i++) {
    if (videosDataBase[i].id === +req.params.id) {
      videosDataBase.splice(i, 1);
      res.sendStatus(204);
      return;
    }
  }
  res.sendStatus(404);
});