import express, {Request, Response} from "express"
import { videosRouter } from "./routers/videos_router";

const app = express()
const port = 3000

app.use("/videos", videosRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})