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
import colors from "../../../colors";
import Files from "./Files";
import Data from "./Data";
import AlertDialogComp from "./AlertDialogComp";
import PdfView from "./PdfView";

const Review = ({
  extractedFiles,
  extractedText,
  setCurrentStep,
  progress,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const filesOrData = () => {
    if (selectedFile) {
      return (
        <Data
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          extractedFiles={extractedFiles}
        />
      );
    } else {
      return (
        <Files
          extractedFiles={extractedFiles}
          setSelectedFile={setSelectedFile}
          progress={progress}
          setCurrentStep={setCurrentStep}
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
      </GridItem>
      <GridItem
        rowSpan={12}
        colSpan={8}
        display={"flex"}
        justifyContent={"center"}
      >
        <PdfView extractedFiles={extractedFiles} selectedFile={selectedFile} />
      </GridItem>
    </Grid>
  );
};

export default Review;
