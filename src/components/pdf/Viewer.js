import React from "react";
import {
  Box,
  HStack,
  Button,
  IconButton,
  Grid,
  GridItem,
  Image,
} from "@chakra-ui/react";
import { FaChevronRight, FaChevronLeft, FaPlus, FaMinus } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { useState, useRef } from "react";
import colors from "../../colors";
import Files from "./Files";
import Data from "./Data";
import AlertDialogComp from "../main/AlertDialogComp";

const Viewer = ({
  extractedFiles,
  extractedText,
  setCurrentStep,
  progress,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pdfPages = extractedFiles[0].pdfPages;
  const pdfText = extractedFiles[0].pdfText;
  const [zoomLevel, setZoomLevel] = useState(1); // Starting with 1 as the default zoom level
  const pdfContainerRef = useRef(null);

  const filesOrData = () => {
    if (selectedFile) {
      return (
        <Data
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          pdfText={selectedFile ? selectedFile.pdfText : pdfText}
        />
      );
    } else {
      return (
        <Files
          extractedFiles={extractedFiles}
          setSelectedFile={setSelectedFile}
          progress={progress}
        />
      );
    }
  };

  return (
    <Grid
      height={"89.66vh"}
      // bg={colors.darkBlue}
      templateRows="repeat(12, 1fr)"
      templateColumns="repeat(12, 1fr)"
      // gap={4}
    >
      <GridItem
        rowSpan={12}
        colSpan={selectedFile ? 4 : 4}
        // bg={colors.blue500}
        position={"relative"}
        borderRight={"1px"}
        borderColor={colors.darkBlue}
      >
        {filesOrData()}
        <Button
          bgColor={"gray.300"}
          _hover={{ bgColor: "gray.200" }}
          color={colors.violet}
          w={"8rem"}
          position={"absolute"}
          bottom={0}
          left={0}
          m={4}
          onClick={() => setCurrentStep((currentStep) => currentStep - 1)}
        >
          Back
        </Button>

        
      </GridItem>
      <GridItem
        rowSpan={12}
        colSpan={8}
        display={"flex"}
        justifyContent={"center"}
      >
        <HStack justifyContent={"space-between"} px={2} w={"100vw"}>
          <IconButton
            aria-label="Previous Page"
            icon={<FaChevronLeft />}
            transform="translateY(-50%)"
            zIndex={2}
            isDisabled={currentPage === 0}
            onClick={() =>
              setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))
            }
          />
          {/* {pdfPages.map((dataUrl, index) => ( */}
          <Box
            // key={index}
            px={1}
            py={1}
            border="2px solid #ccc"
            borderRadius="md"
            boxShadow="md"
            h={"100%"}
            bg={"gray.600"}
            ref={pdfContainerRef}
            transform={`scale(${zoomLevel})`}
            transformOrigin="top left"
            overflow="auto"
          >
            <Image
              src={
                selectedFile
                  ? selectedFile.pdfPages[currentPage]
                  : pdfPages[currentPage]
              }
              alt={`Page ${currentPage + 1}`}
              fit="contain"
              align="center"
              w="100%"
              h="100%"
            />
          </Box>
          {/* ))} */}
          <IconButton
            aria-label="Next Page"
            icon={<FaChevronRight />}
            transform="translateY(-50%)"
            zIndex={2}
            isDisabled={
              currentPage ===
              (selectedFile
                ? selectedFile.pdfPages.length - 1
                : pdfPages.length - 1)
            }
            onClick={() =>
              setCurrentPage((prevPage) =>
                Math.min(
                  prevPage + 1,
                  selectedFile
                    ? selectedFile.pdfPages.length - 1
                    : pdfPages.length - 1
                )
              )
            }
          />
        </HStack>
        <HStack position={"absolute"} top={"11vh"} right={"30vw"}>
          <IconButton
            onClick={() => {
              setZoomLevel((prevZoomLevel) => Math.min(prevZoomLevel + 0.1, 2));
            }}
            icon={<FaPlus />}
            size={"sm"}
            // bg={"transparent"}
          />
          <IconButton
            onClick={() => setZoomLevel(1)}
            icon={<GrPowerReset />}
            size={"sm"}
            // bg={"transparent"}
          />
          <IconButton
            onClick={() => {
              setZoomLevel((prevZoomLevel) =>
                Math.max(prevZoomLevel - 0.1, 0.5)
              );
            }}
            icon={<FaMinus />}
            size={"sm"}
            // bg={"transparent"}
          />
        </HStack>
      </GridItem>
    </Grid>
  );
};

export default Viewer;
