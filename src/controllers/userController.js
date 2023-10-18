import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import users from '../models/users.js';

const register = async (req, res) => {
    try {
    const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

    // Check if email already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: Date.now(),
        email,
        password: hashedPassword,
        role: 'user' // of 'admin'
    };

    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, role: user.role }, 'SECRET_KEY', { expiresIn: '1h' });

    res.json({ message: 'Logged in successfully', token });
};

export {
    register,
    login
};
