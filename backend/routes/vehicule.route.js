const express = require("express");

const router = express.Router();

const createvehicule = require("../controller/vehicle/createVehicule");
const deleVehiculeById = require("../controller/vehicle/deleteVehiculeById");
const updateVehicukleById = require("../controller/vehicle/updateVehiculeById");
const getAllgetAllVehicles = require("../controller/vehicle/getAllVehicles");

const searchByPrice = require("../controller/vehicle/searchByPrice");
const searchByResgistrationNumber = require("../controller/vehicle/searchByResgistrationNumber");


router.post("", createvehicule);
router.get("", getAllgetAllVehicles);
router.delete("/:id", deleVehiculeById);
router.put("/:id", updateVehicukleById);

router.get("/search/price/:price", searchByPrice);
router.get("/search/registration/:registrationNumber", searchByResgistrationNumber);
module.exports = router;