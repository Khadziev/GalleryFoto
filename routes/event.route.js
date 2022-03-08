const { eventController } = require("../controllers/event.controllers");
const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const router = Router();

router.get("/event",eventController.getEvent);
router.get('/event/:id',eventController.getEventById)
router.post("/event/:id",authMiddleware, eventController.createEvent);
router.delete('/event/:id',  eventController.deleteEvent)


module.exports = router;