import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { jsPDF } from "jspdf";
import Radios from '../../component/Radios';
import { MdOutlineFileUpload } from "react-icons/md";
import './dashboard.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../../component/NavBar';
import Header from '../../component/NavBar';


const Dashboard = () => {

  const [file, setFile] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [isUploadButtonEnabled, setIsUploadButtonEnabled] = useState(false);
  const animatedParagraphRef = useRef(null);

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

  const donwnloadHandler = (data) => {
    console.log("download handler")
    const jspdf = new jsPDF();
    const value = data;
    console.log(value)
    const main = {
      callback: function (jspdf) {
        jspdf.save("translated.pdf");
      },
      autoPaging: 'text'
    }
    jspdf.html(value, main);
  }

  // function convertToSingleLineString(multiLineString) {
  //   return multiLineString.replace(/\n/g, ' ').trim();
  // }

  // const singleLineContent = convertToSingleLineString(data);

  // console.log("this is single line content" + singleLineContent);

  // useEffect(() => {
  //   handleTranslation();
  // }, []);
  const hiddenFileInput = useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    const p = animatedParagraphRef.current;
    if (p) {
      const handleAnimationEnd = () => {
        setIsUploadButtonEnabled(true);
      };
      p.addEventListener('animationend', handleAnimationEnd);
      return () => {
        p.removeEventListener('animationend', handleAnimationEnd);
      };
    }
  }, [file]); // Dependency array, to re-attach the event listener when the file changes

  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Row className='mt-4'>
          <Col>
            <p className='custom-heading'>Welcome To Vevaar</p>
          </Col>
        </Row>
        <Row className='mt-3 mb-4'>
          <Col lg={4}>
            <button className='button' onClick={handleClick}>
              <MdOutlineFileUpload style={{fontSize:"2rem"}} /> {" "} Choose File
            </button> 
            <input
              type="file"
              name="fileName"
              ref={hiddenFileInput}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </Col>
          <Col lg={4}>
            <p className={`custom-heading-p ${file ? "animate" : ""}`} ref={animatedParagraphRef}>
              Uploaded file: {file ? file.name : "None"}
            </p>
          </Col>
          <Col lg={4}>
            <button className='button' type="button" onClick={handleUpload} disabled={!isUploadButtonEnabled}>
              Upload
            </button>

          </Col>
        </Row>
        <Row >
          <Col xs={12} className='mb-4'>
            <Radios options={options} selectedOption={language} onOptionChange={handleLanguageChange} />
          </Col>
          <Col xs={12} >
            <p>Selected Language: {language}</p>
          </Col>
        </Row>
        {pdfData && pdfData.map((doc, index) => (
          <Row key={index}>
            <Col>
              <h1>
                Current Page Number {doc.metadata.loc.pageNumber} / {doc.metadata.pdf.totalPages}
              </h1>
              <button ref={btnTransRef}
                onClick={() => {
                  handleTranslation(doc.pageContent);
                  setData(doc.pageContent);
                }}
              >
                Translator
              </button>
              <button onClick={() => { donwnloadHandler(doc.pageContent) }}>Download</button>
              <div dangerouslySetInnerHTML={{ __html: doc.pageContent.replace(/\n/g, '<br/>') }} />
            </Col>
          </Row>
        ))}
        {translatedData && (
          <Row>
            <Col>
              <div dangerouslySetInnerHTML={{ __html: translatedData.replace(/\n/g, '<br/>') }} />
            </Col>
          </Row>
        )}
      </div>
    </div>
  )
}


export default Dashboard