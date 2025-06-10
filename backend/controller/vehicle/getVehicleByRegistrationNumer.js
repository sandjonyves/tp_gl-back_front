const Vehicle = require("../../models/vehicle.model");

// Contrôleur pour récupérer un véhicule par son ID
const getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si l'ID est fourni
    if (!id) {
      return res.status(400).json({ message: "Vehicle ID is required" });
    }

    // Rechercher le véhicule dans la base de données
    const vehicle = await Vehicle.findOne({
        where: {registrationNumber : id},
    });

    // Vérifier si le véhicule existe
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // Retourner les détails du véhicule
    return res.status(200).json({
      message: "Vehicle retrieved successfully",
      vehicle: vehicle.toJSON(),
    });
  } catch (error) {
    console.error("Error retrieving vehicle:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getVehicleById;