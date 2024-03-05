import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { jsPDF } from "jspdf";
import Radios from '../../component/Radios';
import i18n from '../../configuration/i18n'
import { useTranslation, initReactI18next } from 'react-i18next'
import { useNavigate } from 'react-router-dom';
import Header from '../../component/NavBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
initReactI18next.init(i18n)
import './dashboard.css'
import { GoTriangleRight, GoTriangleLeft, GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { showCustomErrorToast } from '../../component/CustomToast';
import { ToastContainer } from 'react-toastify';
import { MdFileUpload } from "react-icons/md";


const Dashboard = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [isPdfVisible, setIsPdfVisible] = useState(false);
  const [language, setLanguage] = useState(null);
  const [jumpToPage, setJumpToPage] = useState("");
  const [data, setData] = useState(" ");
  const fileInputRef = useRef(null);
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


  // console.log(pdfData[0]?.metadata?.pdf?.totalPages)

  const handleTranslation = async (content) => {
    console.log("am i clicked")
    try {
      const response = await axios.post('https://3g14us5zoa.execute-api.us-east-1.amazonaws.com/dev/translate', {
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
        jspdf.save(t("translated.pdf"));
      },
      autoPaging: 'text'
    }
    jspdf.html(value, main);
  }

  const [count, setCount] = useState(1);
  const totalPages = pdfData?.[0]?.metadata?.pdf?.totalPages;
  console.log(totalPages)

  const increment = () => {
    if (count >= totalPages) {
      setCount(1);
    } else {
      setCount(count + 1);
    }
  }

  const decrement = () => {
    if (count <= 1) {
      setCount(totalPages);
    } else {
      setCount(count - 1);
    }
  }

  const togglePdfVisibility = () => {
    setIsPdfVisible(!isPdfVisible); // Toggle visibility
  };
  const handleJump = () => {
    const pageNumber = parseInt(jumpToPage);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCount(pageNumber);
    } else {
      showCustomErrorToast(t('Page Out of Range'));
    }
    setJumpToPage(""); // Reset the input field after jumping.
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const selectedLanguage = localStorage.getItem('selectedLanguage');
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
    }
  }, []);


  return (
    <div>
      <ToastContainer />
      <div>
        <Header />
      </div>

      <div>
        <Row className='mt-5 mb-4'>
          <Col lg={4}>

            <input
              type="file"
              name="fileName"
              ref={fileInputRef}
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: 'none' }}
            />
            <button className='button' type="button" onClick={handleFileInputClick}>
            <MdFileUpload /> {" "} {t('Choose File')} 
            </button>
          </Col>
          <Col lg={4}>
            <p>{t('Uploaded file:')} {file ? file.name : "None"}</p>
          </Col>
          <Col lg={4}>
            <button className='button' type="button" onClick={handleUpload} disabled={!file || !language}>
              {t('Upload')}
            </button>

          </Col>
        </Row>
        <Row >
          <Col xs={12} className='mb-4'>
            <Radios options={options} selectedOption={language} onOptionChange={handleLanguageChange} />
          </Col>
          <Col xs={12} >
            <p>{t('Selected Language :')}{language}</p>
          </Col>
        </Row>

        {translatedData && <div>
          <Row>
            <Col>
              <div dangerouslySetInnerHTML={{ __html: translatedData.replace(/\n/g, '<br/>') }} />
            </Col>
          </Row>
        </div>
        }
        <div className="singleContainer mt-3">
          <Row style={{ height: '100vh' }}>
            <Col lg={12}>
              <div className='pager'>
                <Col lg={2}>
                  <button className='button' variant="primary" onClick={decrement}><GoTriangleLeft style={{ fontSize: "2rem" }} /></button>
                </Col>
                <Col lg={3}><p>{t('Current Page Number')} {count} / {t('Total Pages')} {totalPages}</p></Col>
                <Col lg={2}> <button className='button' onClick={increment} disabled={count >= totalPages}><GoTriangleRight style={{ fontSize: "2rem" }} /></button></Col>
                <Col lg={2}> <button className='button'onClick={()=>{handleTranslation(pdfData[count].pageContent)}} >{t('Translate')}</button></Col>
                {/* <Col lg={2}> <button className='button'>{t('jump')}</button></Col> */}
                <Col lg={3}>
                  <button className='button' onClick={() => handleJump()}>{t('Jump')}</button>
                  <input
                    type="text"
                    placeholder={t('jump')}
                    value={jumpToPage}
                    onChange={(e) => setJumpToPage(e.target.value)}
                    className='jump-to-page '
                  />
                </Col>

              </div>
              <div className='content mx-4 mt-2'>
                {pdfData && pdfData[count - 1] && pdfData[count - 1].pageContent}
              </div>
            </Col>
          </Row>
        </div>

        <div className='mt-5 mb-3'>
          <Row>
            <Col lg={12}>
              <div className='pdfcontent'>
                {isPdfVisible ? (
                  <button className='button' onClick={togglePdfVisibility}>
                    <GoTriangleUp style={{ fontSize: "2rem" }} />
                  </button>
                ) : (
                  <button className='button' onClick={togglePdfVisibility}>
                    <GoTriangleDown style={{ fontSize: "2rem" }} />
                  </button>
                )}
                <label style={{ fontSize: "2rem" }}>SEE FULL PDF</label>
              </div>
              <div className='pdfscontent mt-2'>
                {isPdfVisible && pdfData &&
                  pdfData.map((doc, index) => (
                    <Row key={index} >
                      <h1>
                      {doc?.metadata?.loc?.pageNumber}
                      </h1>
                      <Col>
                        <div className="pdf-page-content" dangerouslySetInnerHTML={{ __html: doc.pageContent.replace(/\n/g, '') }} />
                      </Col>
                    </Row>
                  ))}
              </div>
            </Col>
          </Row>
        </div>


      </div>
    </div>
  )
}


export default Dashboard;