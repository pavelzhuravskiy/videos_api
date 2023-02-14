"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const src_1 = require("../src");
const testArray = [];
beforeEach(() => {
    testArray[0] = {
        "id": 1675856659341,
        "title": "test1",
        "author": "testAuthor1",
        "canBeDownloaded": false,
        "minAgeRestriction": null,
        "createdAt": "2023-02-08T11:44:19.281Z",
        "publicationDate": "2023-02-09T11:44:19.281Z",
        "availableResolutions": [
            "P1080"
        ]
    };
    testArray[1] = {
        "id": 1675856660888,
        "title": "test2",
        "author": "testAuthor2",
        "canBeDownloaded": false,
        "minAgeRestriction": null,
        "createdAt": "2023-02-08T11:44:19.281Z",
        "publicationDate": "2023-02-09T11:44:19.281Z",
        "availableResolutions": [
            "P1080"
        ]
    };
    testArray[2] = {
        "id": 1675856662109,
        "title": "test3",
        "author": "testAuthor3",
        "canBeDownloaded": false,
        "minAgeRestriction": null,
        "createdAt": "2023-02-08T11:44:19.281Z",
        "publicationDate": "2023-02-09T11:44:19.281Z",
        "availableResolutions": [
            "P1080"
        ]
    };
});
describe("DELETE /testing", () => {
    test("should delete all data from array", () => __awaiter(void 0, void 0, void 0, function* () {
        const deleteTesting = yield (0, supertest_1.default)(src_1.app).delete("/testing/all-data");
        const getTesting = yield (0, supertest_1.default)(src_1.app).get("/testing/all-data");
        expect(deleteTesting.statusCode).toBe(204);
        expect(getTesting).toBe([]);
    }));
});
