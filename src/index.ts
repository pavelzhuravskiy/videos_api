import express, {Request, Response} from "express"

const app = express()
const port = 3000

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

app.get('/videos', (req: Request, res: Response) => {
    res.send(videos)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})