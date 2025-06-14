const User = require("../../models/user.model");
const bcrypt = require("bcrypt");
const ms = require("ms");

const createUser = async (req, res) => {
    try {
        const { name, password, role } = req.body;
    
        const existingUser = await User.findOne({ where: { name } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        
        const newUser = await User.create({
             name,
             password: hashedPassword, 
             role: role === "admin" ? "admin" : "user", 
            });
         
        const {accessToken, refreshToken} = await newUser.generateTokens();    
        newUser.refreshToken = refreshToken;
        await newUser.save();

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: ms(process.env.ACCESS_TOKEN_EXPIRES),
        });

        
        res.cookie("refreshToken", refreshToken, {  
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: ms(process.env.REFRESH_TOKEN_EXPIRES),
        });

        return res.status(201).json({ 
            ...newUser, 
            message: "user created successfully",
            
        });

    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: error.message });
    }
    }

module.exports = createUser
