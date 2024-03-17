import mongoose from "mongoose";

// MongoDB Connection string, can be changed from .env file
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("NO MONGODB_URI DEFINED IN ENV");
}

/*
  Mongoose supports a separate strictQuery option to avoid strict mode for query filters. 
  This is because empty query filters cause Mongoose to return all documents in the model, which can cause issues.
  
  To get rid of the deprecation warning, strictQuery is set to true.
*/
mongoose.set('strictQuery', true);

// Cached mongoose connection so that nextjs does not create a new instance for each page
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
