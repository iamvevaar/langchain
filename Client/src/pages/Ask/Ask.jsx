import axios from 'axios';
import React, { useState } from 'react'
import { FileUploader } from "react-drag-drop-files";
import './ask.css'
import {useTranslation,initReactI18next} from 'react-i18next'
import i18n from '../../configuration/i18n';

const fileTypes = ["PDF"];

initReactI18next.init(i18n)

const Ask = () => {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const {t} = useTranslation()

  const handleChange = (file) => {
    const formData = new FormData();
    setFile(file);
    formData.append("fileName", file);
    try {
      axios
        .post("http://localhost:9001/upload", formData)
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
        })
        ;
    } catch (error) {
      console.error(error);
    }
  };

  const postQuestionHandler = async () => {
    try {
      const response = await fetch("http://localhost:9001/api/setQuestions", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({ question })
      });
      // Handle the response as needed
      const result = await response.json();
      console.log(result);

      // Update the state with the received answer
      setAnswers(prevAnswers => [...prevAnswers, result.answer.text]);
    } catch (error) {
      console.error('Error posting question:', error);
    }

  }

  return (
    <div className='main'>
      <div className='fileBox'>
        <FileUploader className="demo" handleChange={handleChange} name="file" types={fileTypes} />
        <p>{file ? `${t('Uploaded file:')} ${file.name}` : t('Not A file Selected Yet')}</p>
      </div>
      <div className='questionBox'>
        <input type="text" onChange={(e) => setQuestion(e.target.value)} value={question} placeholder={t('Ask Your Question')} disabled={!file} />
        <button onClick={postQuestionHandler} disabled={!question}>{t('Go')}</button>
      </div>
      {answers.length > 0 && (
        <div className='answerBox'>
          {answers.map((answer, index) => (
            <div className='eachAns' key={index}>{t('Answer')} {index + 1}: {answer}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Ask