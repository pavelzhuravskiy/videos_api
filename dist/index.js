"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testing_router_1 = require("./routers/testing_router");
const videos_router_1 = require("./routers/videos_router");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use("/videos", videos_router_1.videosRouter);
app.use("/testing", testing_router_1.testingRouter);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
