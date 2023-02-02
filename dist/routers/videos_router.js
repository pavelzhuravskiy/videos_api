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
exports.videosRouter.post("/", (req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const availableResolutions = req.body.availableResolutions;
    const newVideo = {
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
