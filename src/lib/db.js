import mongoose from "mongoose";

let MONGODB_URI = process.env.MONGODB_URI;

/**
 * Global cache for the MongoDB connection to prevent
 * multiple connections in development (hot reload).
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    if (process.env.NODE_ENV !== "production" && MONGODB_URI && MONGODB_URI.includes("localhost")) {
      try {
        const { MongoMemoryServer } = await import("mongodb-memory-server");
        const mongoServer = await MongoMemoryServer.create();
        MONGODB_URI = mongoServer.getUri();
        console.log("Using in-memory MongoDB at", MONGODB_URI);
      } catch (e) {
        console.log("MongoMemoryServer failed to start, trying local instance");
      }
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    console.error("MongoDB Connection Error Details:", e.message);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
