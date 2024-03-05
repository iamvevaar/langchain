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

const Dashboard = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();

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

  const [count, setCount] = useState(0);
  const totalPages = pdfData?.[0]?.metadata?.pdf?.totalPages;
  console.log(totalPages)

  const increment = () => {
    if (count >= totalPages) {
      return;
    }
    setCount(count + 1);
  }
  const decrement = () => {
    if (count <= 1) {
      return;
    }
    setCount(count - 1);

  }


  return (
    <div>
      <Header />
      <p>{t('Welcome To Langchain')}</p>
      {console.log("hello saab")}

      <input
        type="file"
        name="fileName"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="button" onClick={handleUpload}>
        {t('Upload')}
      </button>
      <p>{t('Uploaded file:')} {file ? file.name : "None"}</p>

      <Radios options={options} selectedOption={language} onOptionChange={handleLanguageChange} />
      <p>{t('Selected Language :')}{language}</p>

      {translatedData && <div>
        <div dangerouslySetInnerHTML={{ __html: translatedData.replace(/\n/g, '<br/>') }} />
      </div>
      }
        <div className='singleContainer' >
          <div className='pager'>
            <button onClick={decrement}>{t('Previous')}</button>
            <p>{t('Current Page Number')} {count} / {t('Total Pages')}</p>
            <button onClick={increment} disabled={count > totalPages} >{t('Next')}</button>
          </div>
          <div className='content'>
            {pdfData && pdfData[count].pageContent}
          </div>
        </div>
        {/* {
          console.log(pdfData[0]?.metadata?.pdf?.totalPages)
        } */}

        {pdfData &&
          pdfData.map((doc, index) => (
            <div key={index}>
              <h1>
                {t('Current Page Number')} {doc.metadata.loc.pageNumber} /{" "}
                {doc.metadata.pdf.totalPages}
              </h1>{" "}
              <button ref={btnTransRef}
                onClick={() => {
                  handleTranslation(doc.pageContent);
                  setData(doc.pageContent)
                  { data }
                  console.log("btnTanshoo mein")
                }}
              >
                {t('Translator')}
              </button>
              <button onClick={() => { donwnloadHandler(doc.pageContent) }}>{t('Download')}</button>
              {/* <p>{doc.pageContent}</p> */}
              <div dangerouslySetInnerHTML={{ __html: doc.pageContent.replace(/\n/g, '<br/>') }} />
            </div>
          ))}


        <button className="btn btn-lg" style={{ backgroundColor: "#20df7f", color: "white", boxShadow: "0px 15px 10px -15px #111" }} onClick={() => navigate('/Ask')}>Submit</button>
        <button className="btn btn-lg" style={{ backgroundColor: "#20df7f", color: "white", boxShadow: "0px 15px 10px -15px #111" }} onClick={() => navigate('/Login')}>Submit</button>
        <button className="btn btn-lg" style={{ backgroundColor: "#20df7f", color: "white", boxShadow: "0px 15px 10px -15px #111" }} onClick={() => navigate("/Register")}>Submit</button>

      </div>
  )
}


export default Dashboard;
