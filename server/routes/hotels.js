import express from "express";
import {
  countByCity,
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  updateHotel,
} from "../controllers/hotel.js";

const router = express.Router();

// CRUD operation from controllers

router.post("/", createHotel);

router.put("/find/:id", updateHotel);

router.delete("/find/:id", deleteHotel);

router.get("/find/:id", getHotel);

router.get("/", getAllHotels);

router.get("/countByCity", countByCity);
router.get("/CountByType", getAllHotels);

export default router;
