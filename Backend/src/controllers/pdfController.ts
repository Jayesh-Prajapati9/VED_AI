import { Request, Response } from "express";
import { getStoredURL } from "../supabase/supabase";
import vision from "@google-cloud/vision";
import fs from "fs";
import { PrismaClient } from "@prisma/client";
import path from "path";
import { fromPath } from "pdf2pic";

const prismaClient = new PrismaClient();
const visionClient = new vision.ImageAnnotatorClient();

export const pdfController = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userid;
        const file = req.file;
        const filePath = file?.path || "";
        const fileName = file?.filename || "";

        const outputDirectory = `./output/${fileName}`;
        fs.mkdirSync(outputDirectory);

        const baseOptions = {
            width: 2550,
            height: 3300,
            density: 330,
            savePath: outputDirectory,
        };

        const convert = fromPath(filePath, baseOptions);
        const data = convert.bulk(-1);

        const pdfStoredURL = await getStoredURL(filePath);

        const prismaFile = await prismaClient.pdfFiles.create({
            data: {
                userId: userId,
                fileName: fileName,
                uploadedURL: pdfStoredURL,
            },
        });

        if (!prismaFile) {
            console.log("File not stored in db");
        }

        const finalResult: string[] = [];

        for (const file of outputDirectory) {
            const fileUrl = path.join(outputDirectory, file);
            const [result] = await visionClient.textDetection(fileUrl);
            const text = result.fullTextAnnotation
                ? `${result.fullTextAnnotation}`
                : "";
            finalResult.push(`\n${text}`);
        }
        res.status(200).json({
            extractedMsg: finalResult.toString(),
        });

        const prismaText = await prismaClient.extractedText.create({
            data: {
                extractedText: finalResult.toString(),
                pdfFileId: prismaFile.id,
            },
        });

        if (!prismaText) {
            console.log("Extracted text not stored in db");
        }

        fs.rmdirSync(outputDirectory);
    } catch (err: any) {
        console.log(err);
    }
};
