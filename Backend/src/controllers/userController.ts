import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const JWT_SECRET = process.env.JWT_SECRET || "";

dotenv.config();
const client = new PrismaClient();

export const userSignUp = async (req: Request, res: Response) => {
    const userName = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const firstName = req.body.firstname;
    const lastName = req.body.lastName;
    const fullName = `${firstName} ${lastName}`;

    const hashPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

    const user = await client.user.create({
        data: {
            email,
            fullName,
            hashPassword,
            userName,
        },
    });

    if (!user) {
        return res.status(404).json({
            message: "Error while Signin Up in DataBase",
        });
    }

    res.status(200).json({
        message: "SignUp Succesfully",
    });
};

export const userSignIn = async (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;
    const hashPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

    const user = await client.user.findFirst({
        where: {
            userName: username,
            hashPassword: hashPassword,
        },
    });

    if (!user) {
        res.status(404).json({
            message: "Invalid Credentials",
        });
    }

    const userId = user?.id.toString() || "";

    console.log(JWT_SECRET);

    const token = jwt.sign(userId, JWT_SECRET);

    res.cookie("token", `${token}`, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: false,
    });
    res.status(200).json({
        message: "You have sign in succesfully",
        token: token,
    });
};

export const userProfile = async (req: Request, res: Response) => {
    const userId = req.body.userid;
    const user = await client.user.findFirst({
        where: {
            id: userId,
        },
    });

    if (!user) {
        res.status(404).json({
            message: "User not found",
        });
    }

    res.status(200).json({
        profile: `${user}`,
    });
};

export const userLogout = (req: Request, res: Response) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "You have Logged Out",
    });
};
