import "server-only";
import mongoose from "mongoose";

declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local"
//   );
// }

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function connectToDB() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    if (!MONGODB_URI) {
      throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
      );
    }
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("Database connection established.");

      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// import mongoose, { ConnectOptions } from "mongoose";

// const configOptions: ConnectOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// const connectToDB = async () => {
//   // Check if MONGODB_URI is defined
//   if (!process.env.MONGODB_URI) {
//     throw new Error("MONGODB_URI is not defined in environment variables");
//   }
//   const connectionUrl = process.env.MONGODB_URI;
//   mongoose
//     .connect(connectionUrl, configOptions)
//     .then(() => console.log("FashionShop database connected successfully."))
//     .catch((err) =>
//       console.log(`Error connceting to database: ${err.message}`)
//     );
// };

// export default connectToDB;
