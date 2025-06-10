const vehicle = require("../../models/vehicle.model");
const ValuidNumber = require("../../utils/ValidNumber");

const searchByRegistrationNumber = async (req, res) => {
    const { registrationNumber } = req.params;

    if (!registrationNumber) {
        return res.status(400).json({ message: "Registration number is required" });
    }

    if(!ValuidNumber(registrationNumber)){
        return res.status(400).json({ message: "Registration number is not valid" });
    }
    try {
        const vehicleSearch = await vehicle.findOne({
            where: {
                registrationNumber: registrationNumber
            }
        });

        if (!vehicleSearch) {
            return res.status(404).json({ message: "No vehicle found with this registration number" });
        }

        return res.status(200).json(vehicleSearch);
    } catch (error) {
        console.error("Error while searching vehicle by registration number:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = searchByRegistrationNumber;