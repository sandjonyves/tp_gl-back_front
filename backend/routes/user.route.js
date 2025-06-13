const router = require("express").Router();
const authenticate = require("../middleware/authenticate.middleware");
const authorize = require("../middleware/authorize.middleware");
const {
  createUser,
  loginUser,
  logoutUser,
  refreshExpiretedToken,  
  updateUserName,      
  updateUserRole,
  getAllUser   
} = require("../controller/user/index.controller");


router.post("/register", createUser);  
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", refreshExpiretedToken); 
router.get("/all", authenticate, authorize('admin'), getAllUser);



router.put("/update/:id", authenticate, updateUserName);  
router.put("/update/role/:id", authenticate, authorize('admin'), updateUserRole);  
module.exports = router;