import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const password = "lol";  // Choose a secure password
const hashedPassword = await bcrypt.hash(password, 10);

let users = [

    {
        id: Date.now(),
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin"  // Specify the role as admin
    },

    {
        id: Date.now(),
        email: "user@gmail.com",
        password: hashedPassword,
        role: "user"  // Specify the role as admin
    }

];

const requireAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access forbidden: Admins only' });
    }
    next();
};

const requireAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, 'SECRET_KEY');
        req.userId = decodedToken.userId; // Add user ID to request object
        console.log(token);
        next();
    } catch {
        res.status(401).json({ message: 'Authentication failed' });
    }
};

export { requireAdmin, requireAuth };

export default users;
