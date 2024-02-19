import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv'
dotenv.config();
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import express from 'express';
import multer from 'multer';
import cors from 'cors';    
import fs from 'fs';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        return cb(null, 'uploaded-file.pdf'); // Set the filename to a fixed value
    }
});

const upload = multer({ storage: storage });
let docs = new Array();

async function dataExtractor() {
    try {
        const uploadFolder = './uploads';
        const files = fs.readdirSync(uploadFolder);
        if (files.length > 0) {
            const firstFile = files[0];
            const loader = new PDFLoader(`${uploadFolder}/${firstFile}`);
            docs = await loader.load();
            console.log(docs);            
        } else {
            console.log('No files found in the "uploads" folder.');
        }
    } catch (error) {
        console.error('An error occurred during translation:', error);
    }
}


app.post("/upload", upload.single('fileName'), (req, res) => {
    console.log(req.file);
    dataExtractor();    
    return res.send('File uploaded successfully');
});

app.get("/api/getData", (req, res) => {
    return res.json(docs);
});

// New endpoint to clear the docs variable
app.get("/api/clearData", (req, res) => {
    docs = new Array();
    return res.send('Data cleared successfully');
});
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.get("/api/translation", (req, res) => {
// Access your API key as an environment variable (see "Set up your API key" above)

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = "Write a story about a magic backpack."

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
});


console.log("i am ye wwaala"+docs);