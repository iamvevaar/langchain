import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [file, setFile] = useState(null);
  const [pdfData, setPdfData] = useState(null);

  const [isClicked, setIsClicked] = useState(false);

  const fetchPdfData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getData");
      setPdfData(response.data);
    } catch (error) {
      console.error("Error fetching PDF data:", error);
    }
  };

  useEffect(() => {
    fetchPdfData();
  },[isClicked]);

  

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("fileName", file);
    try {
      axios
        .post("http://localhost:5000/upload", formData)
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
        })
        .then(() => {
          fetchPdfData();
        });
        ;
    } catch (error) {
      console.error(error);
    }finally{
      setIsClicked(!isClicked);
    }
  };

  const handleTranslation = (e) => {
    console.log("first");
    console.log(e.target.value);
  };

  return (
    <div>
      <p>Welcome To Langchain</p>
      {console.log("hello saab")}

      <input
        type="file"
        name="fileName"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="button" onClick={handleUpload}>
        Upload
      </button>
      <p>Uploaded file: {file ? file.name : "None"}</p>

      {pdfData &&
        pdfData.map((doc, index) => (
          <div key={index}>
            <h1>
              Current Page Number {doc.metadata.loc.pageNumber} /{" "}
              {doc.metadata.pdf.totalPages}
            </h1>{" "}
            <button
              onClick={(e) => {
                handleTranslation;
              }}
            >
              Translator
            </button>
            <p>{doc.pageContent}</p>
          </div>
        ))}
    </div>
  );
};

export default Home;
