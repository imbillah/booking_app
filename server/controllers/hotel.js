// creating controller for CRUD operation
import Hotel from "../models/Hotel.js";

// CREATE
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};
// UPDATE
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};
// DELETE
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel Deleted successful");
  } catch (error) {
    next(error);
  }
};

// GET
export const getHotel = async (req, res, next) => {
  try {
    const filteredHotel = await Hotel.findById(req.params.id);
    res.status(200).json(filteredHotel);
  } catch (error) {
    next(error);
  }
};
export const getAllHotels = async (req, res, next) => {
  try {
    const allHotels = await Hotel.find();
    res.status(200).json(allHotels);
  } catch (error) {
    next(error);
  }
};
// get hotels by City & Types
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const cityList = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(cityList);
  } catch (error) {
    next(error);
  }
};
export const countByTypes = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};
