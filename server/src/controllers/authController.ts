import { prisma } from '../utils/prisma.js'
import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/generateToken.js';


const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const exists = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (exists) {
            return res.status(400).json({ status: "error", data: "Email already in use" });
        }

        const hashedPassword: string = await bcrypt.hash(password, 11);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        return res.status(201).json({
            status: "success",
            data: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: "error", data: "Error registering user" });
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const currUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!currUser) {
            return res.status(400).json({ status: "error", data: "Invalid email or password" });
        }

        const pwdCheck = await bcrypt.compare(password, currUser.password);
        if (!pwdCheck) {
            return res.status(400).json({ status: "error", data: "Invalid email or password" });
        }

        const token = generateToken(currUser.id, res);

        return res.status(200).json({
            status: "success",
            data: {
                user: {
                    id: currUser.id,
                    name: currUser.name,
                    email: currUser.email,
                },
                token
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: "error", data: "Error logging in" });
    }
}

const logout = async (req: Request, res: Response) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    });

    return res.status(200).json({ status: "success", data: "Logged out" });
};


export { register, login, logout }