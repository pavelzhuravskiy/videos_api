"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
exports.videosRouter = (0, express_1.Router)({});
const videosDataBase = [];
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
const errorAuthorField = {
    message: "Error",
    field: "author",
};
const errorTitleField = {
    message: "Error",
    field: "title",
};
const errorCanBeDownloadedField = {
    message: "Error",
    field: "canBeDownloaded",
};
const errorMinAgeRestrictionField = {
    message: "Error",
    field: "minAgeRestriction",
};
const errorAvailableResolutionsField = {
    message: "Error",
    field: "availableResolutions",
};
const errorPublicationDateField = {
    message: "Error",
    field: "publicationDate",
};
const errorsArray = errorOuterObject.errorsMessages;
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
        return;
    }
    res.sendStatus(404);
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
        canBeDownloaded: canBeDownloaded || false,
        minAgeRestriction: minAgeRestriction || null,
        createdAt: currentDate,
        publicationDate: tomorrowDate,
        availableResolutions: availableResolutions || ["P1080"],
    };
    // Validation
    // Clearing errors before each validation cycle
    while (errorsArray.length > 0) {
        errorsArray.splice(0, errorsArray.length);
    }
    if (!author || typeof author !== "string" || author.length > 20) {
        errorsArray.push(errorAuthorField);
    }
    if (!title || typeof title !== "string" || title.length > 40) {
        errorsArray.push(errorTitleField);
    }
    if (canBeDownloaded && typeof canBeDownloaded !== "boolean") {
        errorsArray.push(errorCanBeDownloadedField);
    }
    if ((minAgeRestriction && minAgeRestriction > 18) ||
        (minAgeRestriction && minAgeRestriction < 1) ||
        (minAgeRestriction && typeof minAgeRestriction !== "number")) {
        errorsArray.push(errorMinAgeRestrictionField);
    }
    if (availableResolutions &&
        !qualityCheck(availableResolutions, validResolutions)) {
        errorsArray.push(errorAvailableResolutionsField);
    }
    if (errorsArray.length === 0) {
        videosDataBase.push(newVideo);
        res.status(201).send(newVideo);
        return;
    }
    res.status(400).send(errorOuterObject);
});
// PUT
exports.videosRouter.put("/:id", (req, res) => {
    const video = videosDataBase.find((video) => video.id === +req.params.id);
    if (video) {
        // Validation
        // Clearing errors before each validation cycle
        while (errorsArray.length > 0) {
            errorsArray.splice(0, errorsArray.length);
        }
        const title = req.body.title;
        const author = req.body.author;
        const availableResolutions = req.body.availableResolutions;
        const canBeDownloaded = req.body.canBeDownloaded;
        const minAgeRestriction = req.body.minAgeRestriction;
        const publicationDate = req.body.publicationDate;
        if (!author || typeof author !== "string" || author.length > 20) {
            errorsArray.push(errorAuthorField);
        }
        if (!title || typeof title !== "string" || title.length > 40) {
            errorsArray.push(errorTitleField);
        }
        if (canBeDownloaded && typeof canBeDownloaded !== "boolean") {
            errorsArray.push(errorCanBeDownloadedField);
        }
        if ((minAgeRestriction && minAgeRestriction > 18) ||
            (minAgeRestriction && minAgeRestriction < 1) ||
            (minAgeRestriction && typeof minAgeRestriction !== "number")) {
            errorsArray.push(errorMinAgeRestrictionField);
        }
        if (availableResolutions &&
            !qualityCheck(availableResolutions, validResolutions)) {
            errorsArray.push(errorAvailableResolutionsField);
        }
        if (publicationDate && typeof publicationDate !== "string") {
            errorsArray.push(errorPublicationDateField);
        }
        if (errorsArray.length === 0) {
            video.title = title;
            video.author = author;
            video.availableResolutions = availableResolutions || ["P1080"];
            video.canBeDownloaded = canBeDownloaded || false;
            video.minAgeRestriction = minAgeRestriction || null;
            video.publicationDate = publicationDate || tomorrowDate;
            res.status(204).send(video);
            return;
        }
        res.status(400).send(errorOuterObject);
    }
    res.sendStatus(404);
});
// DELETE
exports.videosRouter.delete("/:id", (req, res) => {
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
exports.videosRouter.delete("/", (req, res) => {
    while (videosDataBase.length > 0) {
        videosDataBase.splice(0, videosDataBase.length);
    }
    res.sendStatus(204);
});
