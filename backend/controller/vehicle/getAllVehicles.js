const Vehicle = require("../../models/vehicle.model");


const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.findAll();
        if (vehicles.length === 0) {
            return res.status(404).json({ message: "No vehicles found" });
        }
        return res.status(200).json(vehicles);
    } catch (error) {
        console.error("Error while fetching vehicles:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = getAllVehicles;
