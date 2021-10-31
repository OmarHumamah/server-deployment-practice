"use strict";

const { app } = require("../server");
const supertest = require("supertest");
const request = supertest(app);

describe("API server testing", () => {
  test("invalid path", async () => {
    const response = await request.get("/not-ss");
    expect(response.status).toEqual(404);
  });

  test("home route", async () => {
    const response = await request.get("/");
    expect(response.text).toEqual("the server is live");
  });

  test( '/data endpoint', async ()=>{
    const response = await request.get("/data");
    expect(response.status).toEqual(200);
    expect(typeof response.body).toEqual('object');
  });

  test(' stamper  ', async ()=>{
    const response = await request.get("/data");
    expect(response.status).toEqual(200);
    expect(response.body.Time).toBeDefined();
  })
});
