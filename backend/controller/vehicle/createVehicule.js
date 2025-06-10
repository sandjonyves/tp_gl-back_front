const Vehicle = require("../../models/vehicle.model");

const createVehicule = async (req, res) => {
  try {
    const { registrationNumber, make, model, year, rentalPrice } = req.body;

    const newVehicule = await Vehicle.create({
      registrationNumber,
      make,
      model,
      year,
      rentalPrice
    });

    return res.status(201).json(newVehicule);

  } catch (error) {
    console.error("Erreur de création :", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = createVehicule;
