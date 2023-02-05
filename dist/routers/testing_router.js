"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
exports.testingRouter = (0, express_1.Router)({});
const videosDataBase = [];
exports.testingRouter.delete("/all-data", (req, res) => {
    while (videosDataBase.length > 0) {
        videosDataBase.splice(0, videosDataBase.length);
    }
    res.sendStatus(204);
});
