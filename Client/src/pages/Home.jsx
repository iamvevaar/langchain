import React, { useEffect, useState } from "react";
import axios from "axios";
import Radios from "../component/Radios";
import { useLocation } from "react-router-dom";
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../authentication/Firebase';

const auth = getAuth(app);

const Home = () => {
  const [file, setFile] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [count, setCount] = useState(0);

  const [language, setLanguage] = useState("Hindi");
  const [data, setData] = useState(null);

  const [translatedData, setTranslatedData] = useState(null);

  const location = useLocation()
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedHome');
    if (!hasVisited) {
      localStorage.setItem('hasVisitedHome', true);
      const savedCount = localStorage.getItem('count');
      if (savedCount) {
        setCount(parseInt(savedCount));
      }
    } else {
      const savedCount = location.state ? location.state.count : 0;
      setCount(savedCount);
    }
  }, [location.state]);
  const handleLogout = () => {
    const user = auth.currentUser;
    const userEmail = user ? user.email : 'Unknown';
    signOut(auth)
      .then(() => {
        console.log(`User ${userEmail} signed out successfully`);
        localStorage.clear(); 
        window.location.href = '/Login';
      })
      .catch((error) => {
        console.error("Error signing out:", error.message);
      });
  };
  

  const options = [
    { value: "Hindi", label: "Hindi" },
    { value: "Gujarati", label: "Gujarati" },
    { value: "Tamil", label: "Tamil" },
    { value: "Telugu", label: "Telugu" },
    { value: "Bengali", label: "Bengali" },
    { value: "Marathi", label: "Marathi" },
    { value: "Punjabi", label: "Punjabi" },
  ];

  const handleLanguageChange = (selectedOption) => {
    setLanguage(selectedOption);
  };
  console.log(language)


  const fetchPdfData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getData");
      setPdfData(response.data);
    } catch (error) {
      console.error("Error fetching PDF data:", error);
    }
  };

  const fetchTranlatedData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getTranslatedData");
      setTranslatedData(response.data);
    } catch (error) {
      console.error("Error fetching PDF data:", error);
    }

  }
  useEffect(() => {
    fetchTranlatedData();
  }, [translatedData]);

  useEffect(() => {
    fetchPdfData();
    // Clean up the interval and handle unload
    window.addEventListener("beforeunload", () => {
      // Send a request to the server to clear the data
      axios.get('http://localhost:5000/api/clearData')
        .then((res) => console.log(res.data))
        .catch((error) => console.error('Error clearing data:', error));

      axios.get('http://localhost:5000/api/clearTranslatedData')
        .then((res) => console.log(res.data))
        .catch((error) => console.error('Error clearing data:', error));

    });
  }, [isClicked]);


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

  const handleTranslation = () => {
    console.log("first");
    axios
      .post("http://localhost:5000/api/sendData", {
        text: data,
        language: language,
      })
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        fetchTranlatedData();
      })
      .catch((error) => {
        console.error("Error translating text:", error);
      });
  };

  return (
    <div>
      <div>
        <p>your free trial chance : {count}</p>
      </div>
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

      {translatedData && <p>{translatedData}</p>}

      {pdfData &&
        pdfData.map((doc, index) => (
          <div key={index}>
            <h1>
              Current Page Number {doc.metadata.loc.pageNumber} /{" "}
              {doc.metadata.pdf.totalPages}
            </h1>{" "}
            <button
              onClick={(e) => {
                handleTranslation(e);
                setData(doc.pageContent);
              }}
            >
              Translator
            </button>
            {console.log(data)}
            <p>{doc.pageContent}</p>
          </div>
        ))}
        <div>
        <button onClick={handleLogout}>Logout</button>
        </div>
    </div>
  );
};

export default Home;
