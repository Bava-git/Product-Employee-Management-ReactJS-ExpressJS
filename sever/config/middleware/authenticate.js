const jwt = require('jsonwebtoken');

const authenticate = (allowedRoles = []) => {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Access denied. No token provided or malformed.' });
        }

        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid or expired token' });
            }

            req.user = decoded;

            if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
                return res.status(403).json({ error: 'Access denied. Insufficient role.' });
            }

            next();
        });
    };
};

module.exports = authenticate;

