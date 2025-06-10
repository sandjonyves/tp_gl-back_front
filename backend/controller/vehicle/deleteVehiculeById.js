const Vehicle = require("../../models/vehicle.model");

const deleVehiculeById = async (req, res) => {
  const { id } = req.params;  // Utilisation correcte avec route dynamique
  try {
    const vehicule = await Vehicle.findByPk(id);
    if (vehicule) {
      await vehicule.destroy();  // Suppression de l'instance trouvée
      return res.status(200).json({ message: "Véhicule supprimé avec succès" });
    } else {
      return res.status(404).json({ message: "Le véhicule n'a pas été trouvé" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = deleVehiculeById;
