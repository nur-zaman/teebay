import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import authRouter from "./routes/auth";
import productRouter from "./routes/product";

import * as dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3001;
console.log(process.env.POSTGRES_DATABASE);
app.use(cors());
app.use(bodyParser.json());

app.use("/api", authRouter);

app.use("/api", productRouter);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
