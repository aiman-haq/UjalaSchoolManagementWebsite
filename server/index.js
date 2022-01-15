import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./app/routes/auth.js";
import studentRoutes from "./app/routes/student.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.json({ limit: "20mb", extended: true }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use("/auth", authRoutes);
app.use("/students", studentRoutes);

const CONNECTION_URL = process.env.MONGO_URI;
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Connection is established and runing on port: ${PORT}`)
    )
  )
  .catch((err) => console.log(err.message));

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", async (req, res) => {
    res.send("API is running...");
  });
}
