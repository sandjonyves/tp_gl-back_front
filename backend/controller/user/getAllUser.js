const User = require("../../models/user.model");



const getAllUser = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ["password", "refreshToken"] },
        });

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        return res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: error.message });
    }
}

module.exports = getAllUser;