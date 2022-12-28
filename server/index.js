import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import userRoute from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
dotenv.config();

//To supress warning in terminal
mongoose.set("strictQuery", true);

const port = process.env.PORT || 7000;
const connect = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo Server connected");
  } catch (error) {
    console.log(error.message);
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("Mongo server disconnected");
});

app.listen(port, () => {
  connect();
  console.log(`Backend Running on ${port}`);
});
app.get("/", (req, res) => {
  res.send("Welcome to Booking Server");
});

//my middleware (routes)
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/hotels", hotelsRoute);
app.use("/rooms", roomsRoute);
