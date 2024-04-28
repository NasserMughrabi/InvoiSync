import React from "react";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import Upload from "../step1/Upload";
import Extract from "../step2/Extract";
import Viewer from "../step3/Review";
import Code from "../step4/Code";
import Navbar from "../../dashboard/Navbar";
import StepsNav from "./StepsNav";
// import ProgressBar from "./ProgressBar";

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
      case 3:
        return (
          <Code
            // extractedFiles={extractedFiles}
            // extractedText={extractedText}
            // setCurrentStep={setCurrentStep}
            // progress={progress}
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
      {/* <ProgressBar currentStep={currentStep}  /> */}
      <Box>{renderStep()}</Box>
    </Box>
  );
};

export default Main;
