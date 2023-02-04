import e, { Request, Response, Router } from "express";
import { testingRouter } from "./testing_router";

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

// type ErrorOuterMessageType = { errorsMessages: [] }
//
type ErrorInnerMessageType = {
  message: string;
  field: string;
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
const errorOuterObject = { errorsMessages: [] };
const errorInnerObject = {
  message: "message",
  field: "field",
};
const errorsArray: ErrorInnerMessageType[] = errorOuterObject.errorsMessages;

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

  if (!author || typeof author !== "string") {
    errorInnerObject.field = "author";
    errorsArray.push(errorInnerObject);
  }

  if (!title && typeof title !== "string") {
    errorInnerObject.field = "title";
    errorsArray.push(errorInnerObject);
  }

  if (typeof canBeDownloaded === "boolean") {
    errorInnerObject.field = "canBeDownloaded";
    errorsArray.push(errorInnerObject);
  }

  if (
    minAgeRestriction > 18 ||
    minAgeRestriction < 1 ||
    typeof minAgeRestriction === "number"
  ) {
    errorInnerObject.field = "minAgeRestriction";
    errorsArray.push(errorInnerObject);
  }

  if (availableResolutions && !qualityCheck(availableResolutions, validResolutions)) {
    errorInnerObject.field = "availableResolutions";
    errorsArray.push(errorInnerObject);
  }

  if (errorsArray.length === 0) {
    console.log(errorsArray)
    videosDataBase.push(newVideo);
    res.status(201).send(newVideo);
    return;
  }
  console.log(errorOuterObject)
  res.status(400).send(errorOuterObject);
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
              res.status(204).send(video);
              return;
            }
          }
        }
      }
    }
    // res.status(400).send(errorObject);
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

// DELETE ALL
videosRouter.delete("/", (req: Request, res: Response) => {
  while (videosDataBase.length > 0) {
    videosDataBase.splice(0, videosDataBase.length);
  }
  res.sendStatus(204);
});