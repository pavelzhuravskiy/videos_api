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
const qualityCheck = (arr, arr2) => {
    return arr.every((res) => arr2.includes(res));
};
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
    const minAgeRestriction = req.body.minAgeRestriction;
    const availableResolutions = req.body.availableResolutions;
    const canBeDownloaded = req.body.canBeDownloaded;
    const newVideo = {
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
    if (author &&
        typeof author === "string" &&
        title &&
        typeof title === "string") {
        if (!canBeDownloaded || typeof canBeDownloaded === "boolean") {
            if (!minAgeRestriction ||
                (minAgeRestriction <= 18 && typeof minAgeRestriction === "number")) {
                if (!availableResolutions ||
                    qualityCheck(availableResolutions, validResolutions)) {
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
exports.videosRouter.put("/:id", (req, res) => {
    const video = videosDataBase.find((video) => video.id === +req.params.id);
    if (video) {
        const id = +req.params.id;
        const title = req.body.title;
        const author = req.body.author;
        const canBeDownloaded = req.body.canBeDownloaded;
        const minAgeRestriction = req.body.minAgeRestriction;
        const availableResolutions = req.body.availableResolutions;
        const updatedVideo = {
            id: id,
            title: title,
            author: author,
            canBeDownloaded: canBeDownloaded,
            minAgeRestriction: minAgeRestriction,
            createdAt: currentDate,
            publicationDate: tomorrowDate,
            availableResolutions: availableResolutions,
        };
        if (author && author.length <= 20 && title && title.length <= 40) {
            if (!updatedVideo.minAgeRestriction ||
                updatedVideo.minAgeRestriction <= 18) {
                if (availableResolutions.every((res) => validResolutions.includes(res))) {
                    res.status(201).send(updatedVideo);
                    return;
                }
            }
        }
        res.status(400).send(errorObject);
    }
    else {
        res.sendStatus(404);
    }
});
// DELETE
exports.videosRouter.delete("/:id", (req, res) => {
    const video = videosDataBase.find((video) => video.id === +req.params.id);
    if (video) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
});
