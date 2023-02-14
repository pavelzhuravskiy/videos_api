import request from "supertest";
import { app } from "../index";

beforeAll(async () => {
  await request(app).delete("/videos");
});

const testObj = {
  id: 1675866875035,
  title: "null",
  author: "length_21",
  canBeDownloaded: false,
  minAgeRestriction: 16,
  createdAt: "2023-02-08T13:47:47.672Z",
  publicationDate: "2023-02-09T13:47:47.672Z",
  availableResolutions: ["P1440"],
};

describe("POST /videos", () => {

  // Success

  test("Should create new video", async () => {
    const response = await request(app).post("/videos").send(testObj);
    expect(response.status).toBe(201);
  });
});

describe("GET /videos", () => {

  // Success

  test("Should return all videos", async () => {
    const response = await request(app).get("/videos");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  // Fail

  test("should NOT return video with incorrect id", async () => {
    const response = await request(app).get("/videos/-100");
    expect(response.status).toBe(404);
  });
});