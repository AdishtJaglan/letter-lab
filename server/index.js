if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import express from "express";
import dotenv from "dotenv";

const app = express();

app.listen(3000, () => {
  console.log("Listening on port 3000.");
});
