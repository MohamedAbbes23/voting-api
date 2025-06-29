const checkRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      console.log('👤 User role:', req.user?.role);
      return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
    next();
  };
};

module.exports = { checkRole };
