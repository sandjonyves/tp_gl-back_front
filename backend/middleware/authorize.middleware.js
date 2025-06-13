
const authorize = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.headers['x-user-role']; 
    console.log(allowedRoles)
    console.log("User Role:", req.headers['x-user-role']);
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
}
module.exports = authorize;