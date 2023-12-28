import Express from "express";
import Routers from "./Controllers.js";
import cors from "cors";

import { DB } from "./SequelizeConfig.js";

const app = Express();
app.use(Express.json());
app.use(cors());
app.use("/", Routers);


DB.authenticate().then(res => {
    app.listen(5000, () => console.log("Server running in http://localhost:5000"));
})
.catch(err => console.log(err));