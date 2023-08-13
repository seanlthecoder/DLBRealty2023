const request = require("supertest");
const app = require("../index.js");
import { clearDatabase, connect, closeDatabase } from './db'

// const mongoose = require("mongoose");
// const { MongoClient } = require("mongodb");

// const { MongoMemoryServer } = require("mongodb-memory-server");
// let mongoServer;


beforeAll(async () => {
  mongoServer = await connect()
})
afterEach(async () => {
  await clearDatabase()
})

afterAll(async () => {
  await closeDatabase(mongoServer)
})

describe("GET /api/user/profile", () => {
  // beforeEach(async () => {
  //   jest.setTimeout( 10000);
  // });
  // beforeAll(async () => {
  //   mongoServer = await MongoMemoryServer.create();
  //   // const mongoUri = mongoServer.getUri();
  //   process.env.CONNECTION_STRING = mongoServer.getUri();
  //   // await mongoose.connect(mongoUri);
  // });

  // afterAll(async () => {
  //   // await mongoose.disconnect();
  //   // console.log("mongoose disconnected", mongoServer)
  //   // await mongoServer.stop();
  // });

  it("responds with json containing a list of all users", async () => {


    request(app)
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(expect.any(String));
        done();
      });
  });
});
