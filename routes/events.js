const express = require("express");
const { Event, Rating } = require("../models");
const authenticateJWT = require("../middlewares/auth");
const router = express.Router();

// Buat acara baru
router.post("/", authenticateJWT, async (req, res) => {
  const { name, description } = req.body;
  const event = await Event.create({ name, description });
  res.json(event);
});

// Dapatkan semua acara
router.get("/", async (req, res) => {
  const events = await Event.findAll();
  res.json(events);
});

// Berikan penilaian pada acara
router.post("/:eventId/rate", authenticateJWT, async (req, res) => {
  const { eventId } = req.params;
  const { rating, feedback } = req.body;
  const userId = req.user.id;

  const eventRating = await Rating.create({
    userId,
    eventId,
    rating,
    feedback,
  });
  res.json(eventRating);
});

// Dapatkan statistik penilaian acara
router.get("/:eventId/stats", async (req, res) => {
  const { eventId } = req.params;
  const ratings = await Rating.findAll({ where: { eventId } });

  if (ratings.length === 0) {
    return res.status(404).send("No ratings found for this event");
  }

  const averageRating =
    ratings.reduce((sum, rate) => sum + rate.rating, 0) / ratings.length;
  res.json({ averageRating, totalRatings: ratings.length });
});

module.exports = router;
