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
  GridItem,
  Image,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useState } from "react";
import colors from "../../colors";
import Files from "./Files";
import Data from "./Data";

const Viewer = ({ extractedFiles, extractedText, setStep }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pdfPages = extractedFiles[0].pdfPages;
  const pdfText = extractedFiles[0].pdfText;

  const filesOrData = () => {
    if (selectedFile) {
      return (
        <Data selectedFile={selectedFile} setSelectedFile={setSelectedFile} pdfText={pdfText} />
      );
    } else {
      return (
        <Files
          extractedFiles={extractedFiles}
          setSelectedFile={setSelectedFile}
        />
      );
    }
  };

  return (
    <Grid
      height={"100vh"}
      bg={colors.violet}
      templateRows="repeat(12, 1fr)"
      templateColumns="repeat(12, 1fr)"
      // gap={4}
    >
      <GridItem
        rowSpan={12}
        colSpan={selectedFile ? 4 : 4}
        bg={"white"}
        position={"relative"}
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
          onClick={() => setStep((step) => step - 1)}
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
            h={"100vh"}
            bg={"gray.600"}
          >
            <Image
              src={pdfPages[currentPage]}
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
            isDisabled={currentPage === pdfPages.length - 1}
            onClick={() =>
              setCurrentPage((prevPage) =>
                Math.min(prevPage + 1, pdfPages.length - 1)
              )
            }
          />
        </HStack>
        {/* <Button
          variant={"outline"}
          colorScheme="gray"
          color={"white"}
          w={"8rem"}
          position={"absolute"}
          bottom={0}
          right={0}
          m={4}
          // onClick={() => setStep((step) => step + 1)}
        >
          Next
        </Button> */}
      </GridItem>
    </Grid>
  );
};

export default Viewer;
