import Express from "express";
import { userAuth } from "../middlewares/userMiddleWare";
import { uploadAudio, uploadImages, uploadPdf } from "../multer/multer";
import { audioController } from "../controllers/audioController";
import { ocrController } from "../controllers/ocrController";
import { pdfController } from "../controllers/pdfController";
import { askController } from "../controllers/askController";

const router = Express.Router();

router.post("/ocr/image", uploadImages.single("file"), userAuth, ocrController);

router.post("/pdf", uploadPdf.single("file"), userAuth, pdfController);

router.post(
    "/audio/transcribe",
    uploadAudio.single("audio"),
    userAuth,
    audioController
);

router.post("/ask", userAuth, askController);

export default router;
