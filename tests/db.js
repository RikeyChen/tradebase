// This file assists in writing tests against MongoDB using an in-memory database see: https://javascript.plainenglish.io/unit-test-your-mongoose-model-using-jest-2daf2303c4bf

import mongoose from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongo;

// connect to db
export const setUp = async () => {
  mongo = await MongoMemoryServer.create();
  const url = mongo.getUri();

  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// All tests should start on a blank canvas, which means there should be no existing data in the database when we start a new test. Therefore, every time a test ends, we will call the dropCollections function.
export const dropCollections = async () => {
  if (mongo) {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
  }
};

export const dropDatabase = async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  }
};