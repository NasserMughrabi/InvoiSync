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
  Select,
  Icon,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { MdCheckCircle } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import colors from "../../colors";
import Tesseract from "tesseract.js";
// import * as pdfjsLib from "pdfjs-dist/build/pdf";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Set workerSrc
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const first = {
  rest: {
    rotate: "-15deg",
    scale: 0.95,
    x: "-50%",
    filter: "grayscale(80%)",
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeIn",
    },
  },
  hover: {
    x: "-70%",
    scale: 1.1,
    rotate: "-20deg",
    filter: "grayscale(0%)",
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut",
    },
  },
};

const second = {
  rest: {
    rotate: "15deg",
    scale: 0.95,
    x: "50%",
    filter: "grayscale(80%)",
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeIn",
    },
  },
  hover: {
    x: "70%",
    scale: 1.1,
    rotate: "20deg",
    filter: "grayscale(0%)",
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut",
    },
  },
};

const third = {
  rest: {
    scale: 1.1,
    filter: "grayscale(80%)",
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeIn",
    },
  },
  hover: {
    scale: 1.3,
    filter: "grayscale(0%)",
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut",
    },
  },
};

const PreviewImage = forwardRef((props, ref) => {
  return (
    <Box
      bg="black"
      top="0"
      height="100%"
      width="100%"
      position="absolute"
      borderWidth="1px"
      borderStyle="solid"
      rounded="sm"
      borderColor="gray.400"
      as={motion.div}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      backgroundImage={`url("https://image.shutterstock.com/image-photo/paella-traditional-classic-spanish-seafood-600w-1662253543.jpg")`}
      {...props}
      ref={ref}
    />
  );
});

const Upload = ({ setUploadedFiles, setCurrentStep }) => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const startAnimation = () => controls.start("hover");
  const stopAnimation = () => controls.stop();

  const handleUpload = (e) => {
    const files = e.target.files;
    setUploadedFiles([...files]);

    try {
      for (let file of files) {
        window.electronAPI.uploadFile(file.path);
      }
    } catch (error) {
      alert(error);
    }
    setCurrentStep((currentStep) => currentStep + 1);
  };

  return (
    <VStack
      height={"89vh"}
      // justifyContent={"center"}
      // alignItems={"center"}
      // bg={"green"}
      py={10}
      spacing={10}
    >
      <VStack alignItems={"center"} height={"100%"} spacing={10}>
        <VStack spacing={3} width={"100%"}>
          <Button leftIcon={<FaPlus />}>Add New Vendor</Button>
        </VStack>
        <Container
          // justifyContent={"center"}
          // alignItems={"center"}
          bg={"gray.100"}
          p={4}
          borderRadius={8}
        >
          <AspectRatio width="64" ratio={1}>
            <Box
              borderColor="gray.300"
              borderStyle="dashed"
              borderWidth="2px"
              rounded="md"
              shadow="sm"
              role="group"
              transition="all 150ms ease-in-out"
              _hover={{
                shadow: "md",
              }}
              as={motion.div}
              initial="rest"
              animate="rest"
              whileHover="hover"
              cursor={"pointer"}
            >
              <Box position="relative" height="100%" width="100%">
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  height="100%"
                  width="100%"
                  display="flex"
                  flexDirection="column"
                >
                  <Stack
                    height="100%"
                    width="100%"
                    display="flex"
                    alignItems="center"
                    justify="center"
                    spacing="4"
                  >
                    <Box height="16" width="12" position="relative">
                      <PreviewImage
                        variants={first}
                        backgroundImage="url('https://t4.ftcdn.net/jpg/05/60/45/97/240_F_560459792_f8KCb2ZdaIZzZrEA2HaQ5erYCtT8wlcu.jpg')"
                      />
                      <PreviewImage
                        variants={second}
                        backgroundImage="url('https://t4.ftcdn.net/jpg/05/60/45/97/240_F_560459798_cMFsMWIxvNs2OGfZjtN8eYRmN0oIiZ0b.jpg')"
                      />
                      <PreviewImage
                        variants={third}
                        backgroundImage={`url("https://t3.ftcdn.net/jpg/05/60/45/98/240_F_560459822_Hp4aIPk2EMYkDaiCPTthDL9kgndWr16J.jpg")`}
                      />
                    </Box>
                    <Stack p="8" textAlign="center" spacing="1">
                      <Heading fontSize="lg" color="black" fontWeight="bold">
                        Drop invoices here
                      </Heading>
                      <Text fontWeight="light" color={"black"}>
                        or click to upload
                      </Text>
                    </Stack>
                  </Stack>
                </Box>
                <Input
                  multiple
                  type="file"
                  height="100%"
                  width="100%"
                  position="absolute"
                  top="0"
                  left="0"
                  opacity="0"
                  aria-hidden="true"
                  accept="application/pdf"
                  onDragEnter={startAnimation}
                  onDragLeave={stopAnimation}
                  cursor={"pointer"}
                  onChange={handleUpload}
                />
              </Box>
            </Box>
          </AspectRatio>
        </Container>
      </VStack>
      <Button
        // variant={"outline"}
        colorScheme="blue"
        color={"white"}
        w={"8rem"}
        position={"absolute"}
        bottom={0}
        right={0}
        m={4}
        onClick={() => setCurrentStep((currentStep) => currentStep + 1)}
      >
        Next
      </Button>
      <Button
        bgColor={"gray.300"}
        _hover={{ bgColor: "gray.200" }}
        color={colors.violet}
        w={"8rem"}
        position={"absolute"}
        bottom={0}
        left={0}
        m={4}
        // onClick={() => setCurrentStep((currentStep) => currentStep - 1)}
        onClick={() => navigate("/")}
      >
        Dashboard
      </Button>
    </VStack>
  );
};

export default Upload;