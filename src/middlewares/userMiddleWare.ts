import { Request, Response, NextFunction } from "express";
import jwt, { decode, JwtPayload } from "jsonwebtoken";

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    const response = jwt.verify(token, process.env.JWT_SECRET || "");

    if (!response || typeof response === "string") {
        res.status(404).json({
            message: "You have not logged in",
        });
    }

    req.body.userid = (decode as JwtPayload).id;
    next();
};
