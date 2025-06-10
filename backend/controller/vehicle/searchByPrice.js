const vehicles = require('../../models/vehicle.model');
const { Op } = require('sequelize');
const ValuidNumber = require('../../utils/ValidNumber');

const searchByPrice = async (req, res) => {

    const {price} = req.params;
  
    if(!price){
        return res.status(400).json({message: "Price is required"});
    }
    if(!ValuidNumber(price)){
        return res.status(400).json({message: "Price is not valid"});
    }
    try{
        const vehiclesSearch = await vehicles.findAll({
            where: {
                rentalPrice: {
                    [Op.lte] : parseInt(price)
                }
            }
        });
        if(vehiclesSearch.length === 0){
            return res.status(404).json({message: "No vehicles found with this price"});
        }
        return res.status(200).json(vehiclesSearch);

    }catch(error){
        console.error("Error while searching vehicles by price:", error);
        return res.status(500).json({message: "Internal server error"});
    }

}

module.exports = searchByPrice;