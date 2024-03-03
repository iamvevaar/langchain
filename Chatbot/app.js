import dotenv from "dotenv";
dotenv.config();
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import express from "express";
import multer from "multer";
import cors from "cors";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RetrievalQAChain } from "langchain/chains";
import { OpenAI } from "@langchain/openai";
import bodyParser from "body-parser";

import { FaissStore } from "@langchain/community/vectorstores/faiss";
const app = express();

import fs from "fs";
app.use(bodyParser.json());

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-3.5-turbo",
});
console.log(process.env.OPENAI_API_KEY);
const embeddings = new OpenAIEmbeddings({});

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, "uploaded-file.pdf"); // Set the filename to a fixed value
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("fileName"), (req, res) => {
  console.log(req.file);
  return res.send("File uploaded successfully");
});

const loader = new PDFLoader("./uploads/uploaded-file.pdf");
const docs = await loader.load();
// console.log(docs);
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 20,
});

const splittedDocs = await splitter.splitDocuments(docs);
// console.log(splittedDocs);
const vectorStore = await FaissStore.fromDocuments(docs, embeddings);
const vectorStoreRetriever = vectorStore.asRetriever();

const chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriever);

app.post("/api/setQuestions", async (req, res) => {
  try {
    const { question } = req.body;

    // Handle the question as needed (e.g., save to a database, process, etc.)
    console.log("Received question:", question);
    console.log(question);

    const answer = await chain.call({
      query: question,
    });

    // Send a response (you can customize the response as needed)
    res.json({
      success: true,
      message: "Question received successfully!",
      answer,
    });
  } catch (error) {
    console.error("Error processing question:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// console.log({ res });
