import express from "express";

import session from "express-session";

import connectMongoDbSession from "connect-mongodb-session";

import mongoose from "mongoose";

import morgan from "morgan";

import cors from "cors";
import { User } from "./models";
import sessionRoute from "./routes/sessionRoute";
import permissionRoute from "./routes/permissionRoute";
import roleRoute from "./routes/roleRoute";
import rolePermissionRoute from "./routes/rolePermissionRoute";
import rootRoute from "./routes/rootRoute";
import userRoute from "./routes/userRoute";
import userRoleRoute from "./routes/userRoleRoute";
import privilageRoute from "./routes/privilageRoute";
import resourceRoute from "./routes/resourceRoute";
import resourcePermissionRoute from "./routes/resourcePermissionRoute";

declare module "express-session" {
  interface SessionData {
    views: number;
    userId: mongoose.Types.ObjectId;
    authenticated: boolean;
  }
}

const mongoSession = connectMongoDbSession(session);

const store = new mongoSession({
  uri: "mongodb://127.0.0.1:27017/alley-db",
  collection: "sessions",
});

mongoose.connect("mongodb://127.0.0.1:27017/alley-db").catch(console.error);

const app = express();

app.use(
  session({
    /* use Math.random for prod */
    secret: /* Math.random().toString() */ "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 2 ^ (31 - 1), secure: false },
    store: store,
  })
);

app.use(morgan("dev"));

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:5174"],
  })
);

app.use(express.json());

User.exists({ email: "lucasdev2001@gmail.com" }).then((exists) => {
  if (!exists) {
    User.create({
      email: "lucasdev2001@gmail.com",
      password: "123",
      name: "Lucas",
    });
  }
});

app.use("/", rootRoute);

app.use("/session", sessionRoute);

app.use("/permission", permissionRoute);

app.use("/role", roleRoute);

app.use("/role-permission", rolePermissionRoute);

app.use("/user", userRoute);

app.use("/user-role", userRoleRoute);

app.use("/privilage", privilageRoute);

app.use("/resource", resourceRoute);
app.use("/resource-permission", resourcePermissionRoute);

app.listen(3000, () => console.log("listening"));
