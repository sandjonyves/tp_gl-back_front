const Vehicle = require("../../models/vehicle.model");

const updateVehiculeById = async (req, res) => {
  const { id } = req.params;
  const { registrationNumber, make, model, year, rentalPrice } = req.body;

  try {
    const vehicule = await Vehicle.findByPk(id);

    if (!vehicule) {
      return res.status(404).json({ message: "Véhicule non trouvé" });
    }

    
    if (registrationNumber !== undefined) vehicule.registrationNumber = registrationNumber;
    if (make !== undefined) vehicule.make = make;
    if (model !== undefined) vehicule.model = model;
    if (year !== undefined) vehicule.year = year;
    if (rentalPrice !== undefined) vehicule.rentalPrice = rentalPrice;

    await vehicule.save();

    return res.status(200).json(vehicule);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = updateVehiculeById;
