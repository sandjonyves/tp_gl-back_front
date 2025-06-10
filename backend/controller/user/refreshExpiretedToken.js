const User = require('../../models/user.model');
const jwt = require('jsonwebtoken');

const refreshExpiredToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    const user = await User.findOne({ where: { refreshToken: token } });
    if (!user) {
      return res.status(403).json({ message: 'User not found' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err || decoded.id !== user.id) {
        return res.status(403).json({ message: 'Invalid token' });
      }

      const { accessToken } = user.generateTokens();
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000 // 15 minutes
      });

      return res.status(200).json({ message: 'Token refreshed' });
    });

  } catch (error) {
    if (process.env.NODE_ENV !== 'test') {
      console.error('Refresh token error:', error);
    }
    return res.status(500).json({ message: error.message || 'Error while refreshing token' });
  }
};

module.exports = refreshExpiredToken;
