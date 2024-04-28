import React from "react";
import {
  AspectRatio,
  Box,
  BoxProps,
  Container,
  forwardRef,
  Heading,
  Input,
  Stack,
  HStack,
  Text,
  Progress,
  Flex,
  CircularProgress,
  CircularProgressLabel,
  Button,
  VStack,
  List,
  ListItem,
  ListIcon,
  Card,
  CardBody,
  Divider,
  CardFooter,
  ButtonGroup,
  useDisclosure,
  IconButton,
  Spinner,
  Grid,
  Wrap,
  WrapItem,
  Icon,
} from "@chakra-ui/react";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdCheckCircle } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import colors from "../../../colors";
import { useState, useRef, useEffect } from "react";
import Tesseract from "tesseract.js";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Set workerSrc
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const Extract = ({
  uploadedFiles,
  setUploadedFiles,
  setCurrentStep,
  setExtractedFiles,
  extractedFiles,
  setExtractedText,
  setProgress,
  progress,
  setExtractedData,
}) => {
  const [extracting, setExtracting] = useState(false);
  // const [progress, setProgress] = useState(uploadedFiles.map(() => 0));

  const handleCancelExtract = () => {
    setCurrentStep((currentStep) => currentStep - 1);
    setUploadedFiles([]);
    setExtractedFiles([]);
  };

  const handleExtract = async (e) => {
    setExtracting(true);

    // Initialize progress for each file
    setProgress(uploadedFiles.map(() => 0));

    const updatedExtractedFiles = [];
    for (let i = 0; i < uploadedFiles.length; i++) {
      const uploadedFile = uploadedFiles[i];

      // Start progress for the current file
      setProgress((oldProgress) =>
        oldProgress.map((prog, index) => (index === i ? 10 : prog))
      );

      const extractedData = await window.electronAPI.adobeExtract(
        uploadedFiles[i].name
      );
      // const extractedData = "";
      // setExtractedData((extractedData) => [...extractedData, data])

      const pdfUrl = `uploads/${uploadedFile.name}`; // Replace with PDF file path or URL
      const pages = [];

      const pdfObj = {
        pdfName: pdfUrl,
        pdfPages: [],
        status: "not started",
        extractedData: extractedData,
        index: i,
      };

      try {
        const pdf = await pdfjs.getDocument(pdfUrl).promise;

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          //   const textContext = await page.getTextContent();
          //   for (let context of textContext.items) {
          //     console.log(context.str);
          //   }
          const viewport = page.getViewport({ scale: 4 });
          const canvas = document.createElement("canvas");
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          const context = canvas.getContext("2d");

          await page.render({ canvasContext: context, viewport }).promise;
          pages.push(canvas.toDataURL());
        }

        pdfObj.pdfPages = pages;
      } catch (error) {
        console.error("Error loading PDF: ", error);
      }

      // Update the progress periodically for the current file
      const interval = setInterval(() => {
        setProgress((oldProgress) => {
          const newProgress = [...oldProgress];
          newProgress[i] = Math.min(newProgress[i] + 10, 100);
          return newProgress;
        });

        if (progress[i] >= 100) {
          clearInterval(interval);
        }
      }, 500); // Adjust interval time as needed

      // console.log(pages);
      // for (let image of pages) {
      //   Tesseract.recognize(image, "eng", { logger: (m) => m }).then(
      //     ({ data: { text } }) => {
      //       setExtractedText(text);
      //       pdfObj.pdfText = text;
      //     }
      //   );
      // }
      updatedExtractedFiles.push(pdfObj);
    }

    setExtractedFiles(updatedExtractedFiles);
    setCurrentStep((currentStep) => currentStep + 1);
    setExtracting(false);
  };

  return (
    <VStack height={"89.66vh"} pt={6}>
      <Heading size="md">Files</Heading>
      <Flex spacing={3} mt={2} flexWrap={"wrap"}>
        {uploadedFiles &&
          uploadedFiles.map((file, index) => {
            return (
              <HStack
                key={index}
                m={2}
                justifyContent={"space-between"}
                width={"17rem"}
              >
                <HStack>
                  <Icon as={FaFileInvoiceDollar} color={colors.blue500} />
                  <Text>{file.name.slice(0, 24)}</Text>
                </HStack>
                {extracting ? (
                  <CircularProgress
                    value={progress[index]}
                    color={colors.blue500}
                    thickness="12px"
                    size={"30px"}
                  />
                ) : (
                  <IconButton
                    bg={"white"}
                    ml={2}
                    aria-label="Remove file"
                    icon={<IoTrashOutline color={"red"} />}
                    //   onClick={() => handleRemoveService(index)}
                  />
                )}
              </HStack>
            );
          })}
      </Flex>

      <HStack>
        <Button
          bgColor={colors.blue500}
          _hover={{ bgColor: colors.violetHover }}
          color={"white"}
          w={"8rem"}
          isDisabled={extractedFiles.length > 0}
          onClick={handleExtract}
        >
          Extract data
        </Button>
        <Button
          variant={"outline"}
          colorScheme="red"
          w={"8rem"}
          onClick={handleCancelExtract}
        >
          Cancel
        </Button>
      </HStack>

      {extractedFiles.length > 0 && (
        <Button
          variant={"outline"}
          colorScheme="gray"
          color={"white"}
          _hover={{ bgColor: "white", color: colors.violet }}
          w={"8rem"}
          position={"absolute"}
          bottom={0}
          right={0}
          m={4}
          onClick={() => setCurrentStep((currentStep) => currentStep + 1)}
        >
          Next
        </Button>
      )}
    </VStack>
  );
};

export default Extract;
