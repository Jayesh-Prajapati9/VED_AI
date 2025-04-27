import { Request, Response } from "express";
import { getStoredURL } from "../supabase/supabase";
import fs from "fs";
import { PrismaClient } from "@prisma/client";


import Formdata from "form-data";
import axios from "axios";

const prismaClient = new PrismaClient();

export const audioController = async (req: Request, res: Response) => {
       try {
           const userId = req.body.userid;
           const file = fs.createReadStream(req.file?.path || "");
           const fileName = req.file?.filename || "";

           const audioStoredURL = await getStoredURL(req.file?.path || "");

           const prismaResponse = await prismaClient.audioFiles.create({
               data: {
                   fileName: fileName,
                   userId: userId,
                   uploadedURL: audioStoredURL,
               },
           });

           if (!prismaResponse) {
               console.log("Audio File Not Stores in DB");
           }

           const audioId = prismaResponse.id;

           const form = new Formdata();
           form.append("file", file);
           form.append("model", "whisper-large-v3");

           const response = await axios.post(
               "https://api.groq.com/openai/v1/audio/transcriptions",
               form,
               {
                   headers: {
                       ...form.getHeaders(),
                       Authorization: `Bearer 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`,
                   },
               }
           );

           const transcribe = response.data.text;

           const extractedAudio = await prismaClient.extractedText.create({
               data: {
                   extractedText: transcribe,
                   audioFileId: audioId,
               },
           });
           if (!extractedAudio) {
               console.log("Extracted Text not stored in DB");
           }

           res.status(200).json({
               Extracted_Text: transcribe,
           });
       } catch (err: any) {
           console.log(err);
       }
};
