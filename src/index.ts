import express from "express";
import { testingRouter } from "./routers/testing_router";
import { videosRouter } from "./routers/videos_router";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/videos", videosRouter);
app.use("/testing", testingRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});