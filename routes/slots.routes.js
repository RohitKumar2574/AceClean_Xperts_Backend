const express = require("express");
const router = express.Router();
const slotController = require("../controllers/slots.controller");
const { validateSlot, validateSlotId, validationHandler, validateDate } = require("../middlewares/slotValidation");

router.post("/", validateSlot, validationHandler, slotController.createSlot); 
router.get("/", slotController.getAllSlots);
router.get("/date", validateDate, validationHandler, slotController.getSlotsByDate);
router.get("/:id", validateSlotId, validationHandler, slotController.getSlotById); 
router.put("/:id", validateSlotId, validationHandler, validateSlot, validationHandler, slotController.updateSlot); 
router.delete("/:id", validateSlotId, validationHandler, slotController.deleteSlot); 

module.exports = router;
