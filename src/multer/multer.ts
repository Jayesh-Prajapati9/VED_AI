import multer from "multer";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // folder to save files
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

export const uploadImages = multer({ dest: "src/tempUserFile/tempImages/" });
export const uploadPdf = multer({ dest: "src/tempUserFile/tempPdf/" });
export const uploadAudio = multer({ dest: "src/tempUserFile/tempAudio/" });
// export const upload = multer({ storage });

// export const fileURL =
