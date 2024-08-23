if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 8000;
const connectionString =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/no-idea";

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to database.");
  })
  .catch((error) => {
    console.log("Error connecting to database: " + error.message);
  });

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
