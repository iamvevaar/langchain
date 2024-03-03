import axios from 'axios';
import React, { useEffect, useState , useRef } from 'react'
import Radios from '../../component/Radios';

const Dashboard = () => {

  const [file, setFile] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  const [language, setLanguage] = useState("Hindi");

  const [data, setData] = useState(" ");

  const [translatedData, setTranslatedData] = useState(" ");

  const btnTransRef = useRef(null);

  const options = [
    { value: "hi", label: "Hindi" },
    { value: "gu", label: "Gujarati" },
    { value: "kn", label: "Kannada" },
    { value: "te", label: "Telugu" },
    { value: "ta", label: "Tamil" },
    { value: "bn", label: "Bengali" },
    { value: "mr", label: "Marathi" },
    { value: "pa", label: "Punjabi" },
  ];

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
    } finally {
      setIsClicked(!isClicked);
    }
    { console.log(data) }
  };

  const fetchPdfData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getData");
      setPdfData(response.data);
    } catch (error) {
      console.error("Error fetching PDF data:", error);
    }
  };

  const handleLanguageChange = (selectedOption) => {
    setLanguage(selectedOption);
  };

  const handleTranslation = async (content) => {
    console.log("am i clicked")
    try {
      const response = await axios.post('https://t8ey87nhw3.execute-api.us-east-1.amazonaws.com/dev/translate', {
        text: content,
        lang: language,
      });
      console.log(response.data)
      setTranslatedData(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  // function convertToSingleLineString(multiLineString) {
  //   return multiLineString.replace(/\n/g, ' ').trim();
  // }

  // const singleLineContent = convertToSingleLineString(data);

  // console.log("this is single line content" + singleLineContent);

  // useEffect(() => {
  //   handleTranslation();
  // }, []);

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

      <Radios options={options} selectedOption={language} onOptionChange={handleLanguageChange} />
      <p>Selected Language :{language}</p>

      {pdfData &&
        pdfData.map((doc, index) => (
          <div key={index}>
            <h1>
              Current Page Number {doc.metadata.loc.pageNumber} /{" "}
              {doc.metadata.pdf.totalPages}
            </h1>{" "}
            <button ref={btnTransRef}
              onClick={() => {
                handleTranslation(doc.pageContent);
                setData(doc.pageContent)
                {data}
                console.log("btnTanshoo mein")
              }}
            >
              Translator
            </button>
            {/* <p>{doc.pageContent}</p> */}
            <div dangerouslySetInnerHTML={{ __html: doc.pageContent.replace(/\n/g, '<br/>') }} />
          </div>
        ))}

      {translatedData && <div>
        <div dangerouslySetInnerHTML={{ __html: translatedData.replace(/\n/g, '<br/>') }} />
      </div>
      }


    </div>
  )
}

export default Dashboard