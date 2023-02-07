import { Request, Response, Router } from "express";
import { deleteAllVideos } from "../functions/videos_functions";
import { VideosArrayType, VideosObjectType } from "../types/videos_types";

export const testingRouter = Router({});

const videosDataBase: VideosArrayType = [];

testingRouter.delete("/all-data", (req: Request, res: Response) => {
  deleteAllVideos(videosDataBase);
  res.sendStatus(204);
});