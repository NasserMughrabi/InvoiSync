import React from "react";
import { Box } from "@chakra-ui/react";
import Upload from "./Upload";
import Extract from "./Extract";
import Viewer from "./Viewer";
import { useState } from "react";
import Navbar from "../dashboard/Navbar";
import StepsNav from "./StepsNav";

const Main = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [pdfPages, setPdfPages] = useState([]);
  const [extractedText, setExtractedText] = useState("");
  const [extractedFiles, setExtractedFiles] = useState([]);
  const [progress, setProgress] = useState(uploadedFiles.map(() => 0));

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Upload
            setUploadedFiles={setUploadedFiles}
            setCurrentStep={setCurrentStep}
          />
        );
      case 1:
        return (
          <Extract
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            setCurrentStep={setCurrentStep}
            setExtractedFiles={setExtractedFiles}
            extractedFiles={extractedFiles}
            setExtractedText={setExtractedText}
            setProgress={setProgress}
            progress={progress}
          />
        );
      case 2:
        return (
          <Viewer
            extractedFiles={extractedFiles}
            extractedText={extractedText}
            setCurrentStep={setCurrentStep}
            progress={progress}
          />
        );
      default:
        return <p>Invalid step</p>;
    }
  };

  return (
    <Box>
      {/* <Navbar /> */}
      <StepsNav setCurrentStep={setCurrentStep} currentStep={currentStep} />
      <Box>{renderStep()}</Box>
    </Box>
  );
};

export default Main;
