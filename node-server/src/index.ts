import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
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
import init from "./init";
import userCacheRoute from "./routes/userCacheRoute";
import companyRoute from "./routes/companyRoute";
import cors from "./plugins/cors";
import session from "./plugins/session";
/* setups */

mongoose.connect("mongodb://127.0.0.1:27017/alley-db").catch(console.error);
init();
const app = express();

/* middleweres */

app.use(session);

app.use(morgan("dev"));

app.use(cors);

app.use(express.json());

/* routes */

app.use("/", rootRoute);
app.use("/company", companyRoute);
app.use("/permission", permissionRoute);
app.use("/privilage", privilageRoute);
app.use("/resource-permission", resourcePermissionRoute);
app.use("/resource", resourceRoute);
app.use("/role-permission", rolePermissionRoute);
app.use("/role", roleRoute);
app.use("/session", sessionRoute);
app.use("/user-cache", userCacheRoute);
app.use("/user-role", userRoleRoute);
app.use("/user", userRoute);

app.listen(3000, () => console.log("listening"));
