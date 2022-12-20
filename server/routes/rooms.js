import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  updateRoom,
} from "../controllers/room.js";

const router = express.Router();

// CRUD operation from controllers

router.post("/:hotelid", createRoom);
router.put("/:id", updateRoom);
router.delete("/:id/:hotelid", deleteRoom);
router.get("/:id", getRoom);
router.get("/", getAllRooms);

export default router;
