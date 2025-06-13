const express = require("express");

const router = express.Router();

const createvehicule = require("../controller/vehicle/createVehicule");
const deleVehiculeById = require("../controller/vehicle/deleteVehiculeById");
const updateVehicukleById = require("../controller/vehicle/updateVehiculeById");
const getAllgetAllVehicles = require("../controller/vehicle/getAllVehicles");

const searchByPrice = require("../controller/vehicle/searchByPrice");
const searchByResgistrationNumber = require("../controller/vehicle/searchByResgistrationNumber");
const authenticate = require("../middleware/authenticate.middleware");
const authorize = require("../middleware/authorize.middleware");


router.post("", createvehicule, authenticate, authorize('admin'));
router.get("", getAllgetAllVehicles);
router.delete("/:id", deleVehiculeById,authenticate, authorize('admin'));
router.put("/:id", updateVehicukleById,authenticate, authorize('admin'));

router.get("/search/price/:price", searchByPrice);
router.get("/search/registration/:registrationNumber", searchByResgistrationNumber);
module.exports = router;