import { Request, Response } from "express";
import { getStoredURL } from "../supabase/supabase";
import vision from "@google-cloud/vision";
import fs from "fs";
import { PrismaClient } from "@prisma/client";
import path from "path";

const prismaClient = new PrismaClient();
const visionClient = new vision.ImageAnnotatorClient();

export const ocrController = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userid;
        const file = req.file;
        if (!file) {
            res.status(404).json({
                message: "Image Not Uploaded",
            });
        }
        const filePath = file?.path || "";
        const fileName = file?.originalname || "";
        const fileExt = path.extname(filePath);

        const imageStoredURL = await getStoredURL(filePath);

        const prismaFile = await prismaClient.imagesFiles.create({
            data: {
                userId: userId,
                fileName: fileName,
                uploadedURL: imageStoredURL,
            },
        });
        if (!prismaFile) {
            console.log("File not stored in db");
        }

        const [result] = await visionClient.textDetection(imageStoredURL);

        const extractedText = result.fullTextAnnotation
            ? `${result.fullTextAnnotation.text}`
            : `Not able to read the text properly`;

        res.status(200).json({
            extractedMsg: extractedText,
        });

        const prismaText = await prismaClient.extractedText.create({
            data: {
                extractedText: extractedText,
                imageFileId: prismaFile.id,
            },
        });

        if (!prismaText) {
            console.log("Extracted text not stored in db");
        }

        fs.unlink(filePath, (error) => {
            if (error) {
                console.log(`Image not deleted.\n Error : ${error.message}`);
            }
        });
    } catch (err: any) {
        console.log(err);
    }
};
