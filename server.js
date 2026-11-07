import express from "express";
import multer from "multer";

const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({ url: `/uploads/${req.file.filename}` });
});

app.use("/uploads", express.static("uploads"));
app.listen(3000);

