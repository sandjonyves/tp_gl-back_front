
const createUser = require("./createUser");
const loginUser = require("./loginUser");
const logoutUser = require("./logoutUser");
const refreshExpiretedToken  = require("./refreshExpiretedToken");
const updateUserName = require("./updateUser").updateUserName;
const updateUserRole = require("./updateUser").updateUserRole;
const getAllUser = require("./getAllUser");

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    refreshExpiretedToken,  
    updateUserName,
    updateUserRole,
    getAllUser
};