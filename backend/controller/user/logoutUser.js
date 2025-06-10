const User = require('../../models/user.model');

const logoutUser = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (token) {
      const user = await User.findOne({ where: { refreshToken: token } });
      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    }

    res.clearCookie('accessToken', {
          httpOnly: true,
            secure: true,
            sameSite: "None",
    });
    res.clearCookie('refreshToken', {
     httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).json({ message: 'Déconnecté avec succès' });
  } catch (error) {
    if (process.env.NODE_ENV !== 'test') {
      console.error('Logout error:', error);
    }
    res.clearCookie('accessToken', {
            httpOnly: true,
            secure: true,
            sameSite: "None",
    });
    res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: "None",
    });
    return res.status(500).json({ message: error.message || 'Erreur lors de la déconnexion' });
  }
};

module.exports = logoutUser;