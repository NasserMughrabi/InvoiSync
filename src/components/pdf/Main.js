import React from "react";
import { Box } from "@chakra-ui/react";
import Upload from "./Upload";
import Extract from "./Extract";
import Viewer from "./Viewer";
import { useState } from "react";

const Main = () => {
  const [step, setStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [pdfPages, setPdfPages] = useState([]);
  const [extractedText, setExtractedText] = useState("");
  const [extractedFiles, setExtractedFiles] = useState([]);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Upload setUploadedFiles={setUploadedFiles} setStep={setStep} />;
      case 1:
        return (
          <Extract
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            setStep={setStep}
            setExtractedFiles={setExtractedFiles}
            extractedFiles={extractedFiles}
            setExtractedText={setExtractedText}
          />
        );
      case 2:
        return (
          <Viewer
            extractedFiles={extractedFiles}
            extractedText={extractedText}
            setStep={setStep}
          />
        );
      default:
        return <p>Invalid step</p>;
    }
  };

  return <Box>{renderStep()}</Box>;
  //   return (
  //     <Box>
  //       <Viewer
  //         pdfPages={pdfPages}
  //         extractedText={extractedText}
  //         setStep={setStep}
  //       />
  //     </Box>
  //   );
};

export default Main;
