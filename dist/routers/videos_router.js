"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
exports.videosRouter = (0, express_1.Router)({});
const videosDataBase = [
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
exports.videosRouter.get("/", (req, res) => {
    res.send(videosDataBase);
});
// GET with URI params
exports.videosRouter.get("/:id", (req, res) => {
    const video = videosDataBase.find((video) => video.id === +req.params.id);
    if (video) {
        res.send(video);
    }
    else {
        res.sendStatus(404);
    }
});
// POST
// TODO Define correct video qualities
exports.videosRouter.post("/", (req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const minAgeRestriction = req.body.minAgeRestriction;
    const availableResolutions = req.body.availableResolutions;
    const currentDate = new Date().toISOString();
    const tomorrowDate = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString();
    const newVideo = {
        id: +new Date(),
        title: title,
        author: author,
        canBeDownloaded: false,
        minAgeRestriction: minAgeRestriction,
        createdAt: currentDate,
        publicationDate: tomorrowDate,
        availableResolutions: availableResolutions,
    };
    const errorObject = {
        errorsMessages: [
            {
                message: "string",
                field: "string",
            },
        ],
    };
    if (newVideo.minAgeRestriction === null || newVideo.minAgeRestriction <= 18) {
        videosDataBase.push(newVideo);
        res.status(201).send(newVideo);
        return;
    }
    res.status(400).send(errorObject);
});
