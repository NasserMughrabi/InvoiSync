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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdCheckCircle } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import colors from "../../colors";
import { useState, useRef, useEffect } from "react";
import Tesseract from "tesseract.js";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Set workerSrc
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const Extract = ({
  uploadedFiles,
  setUploadedFiles,
  setStep,
  setExtractedFiles,
  extractedFiles,
  setExtractedText,
}) => {
  const [extracting, setExtracting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleCancelExtract = () => {
    setStep((step) => step - 1);
    setUploadedFiles([]);
    setExtractedFiles([]);
  };

  const handleExtract = async (e) => {
    window.electronAPI.adobeExtract(uploadedFiles[0].name);
    return;
    setExtracting(true);
    startProgress();

    for (let uploadedFile of uploadedFiles) {
      const pdfUrl = `uploads/${uploadedFile.name}`; // Replace with PDF file path or URL
      const pages = [];

      // each pdf contains it's own pages and extracted text, we then add it to extractedFiles
      const pdfObj = {
        pdfName: pdfUrl,
        pdfPages: [],
        pdfText: "",
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

        // setPdfPages(pages);
        pdfObj.pdfPages = pages;
      } catch (error) {
        console.error("Error loading PDF: ", error);
      }

      // console.log(pages);
      for (let image of pages) {
        Tesseract.recognize(image, "eng", { logger: (m) => m }).then(
          ({ data: { text } }) => {
            setExtractedText(text);
            pdfObj.pdfText = text;
          }
        );
      }

      setExtractedFiles((extractedFiles) => [...extractedFiles, pdfObj]);
    }

    setStep((step) => step + 1);
    setExtracting(false);
  };

  const startProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(oldProgress + 10, 100);
      });
    }, 1000);
  };
  return (
    <Flex
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      bg={colors.violet}
    >
      <Flex
        //   display={isOpen ? "block" : "none"}
        borderRadius={8}
        p={4}
        mt={2}
        ml={10}
      >
        {/* maxW="sm" */}
        <Card>
          <CardBody>
            <Stack mt="6" spacing="3">
              <Heading size="md">Files</Heading>
              <List spacing={3} mt={2}>
                {uploadedFiles &&
                  uploadedFiles.slice(0, 9).map((file, index) => {
                    return (
                      <ListItem key={index} width={"100%"}>
                        <HStack justifyContent={"space-between"}>
                          <Box>
                            <ListIcon
                              as={MdCheckCircle}
                              color={colors.violet}
                            />
                            {file.name.slice(0, 24)}
                          </Box>
                          {extracting ? (
                            <CircularProgress
                              value={progress}
                              color={colors.violet}
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
                      </ListItem>
                    );
                  })}
              </List>
            </Stack>
          </CardBody>
          {/* <Divider /> */}
          <CardFooter>
            <HStack>
              <Button
                bgColor={colors.violet}
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
          </CardFooter>
        </Card>
      </Flex>
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
          onClick={() => setStep((step) => step + 1)}
        >
          Next
        </Button>
      )}
    </Flex>
  );
};

export default Extract;
