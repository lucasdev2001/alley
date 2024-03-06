import ConnectMongoDBSession from "connect-mongodb-session";
import session from "express-session";
import mongoose from "mongoose";

declare module "express-session" {
  interface SessionData {
    views: number;
    userId: mongoose.Types.ObjectId;
    authenticated: boolean;
  }
}

const mongoSession = ConnectMongoDBSession(session);

const store = new mongoSession({
  uri: "mongodb://127.0.0.1:27017/alley-db",
  collection: "sessions",
});

export default session({
  /* use Math.random for prod */
  secret: /* Math.random().toString() */ "secret",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 2 ^ (31 - 1), secure: false },
  store: store,
});
