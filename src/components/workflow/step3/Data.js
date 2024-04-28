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
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import { MdCheckCircle, MdIncompleteCircle, MdCancel } from "react-icons/md";
import { useState } from "react";
import AlertDialogComp from "./AlertDialogComp";

const Data = ({ selectedFile, setSelectedFile, extractedFiles }) => {
  // const [invoiceNum, setInvoiceNum] = useState(extractedData.invoice);
  // const [invoiceDate, setInvoiceDate] = useState(extractedData.date);
  // const [invoiceBalance, setInvoiceBalance] = useState(extractedData.balance);

  return (
    <VStack p={4} spacing={4}>
      <Button
        //   bgColor={"gray.300"}
        //   _hover={{ bgColor: colors.violetHover }}
        //   color={colors.violet}
        //   w={"8rem"}
        variant={"link"}
        color={"blue.500"}
        position={"absolute"}
        top={0}
        left={0}
        pl={1}
        pt={2}
        //   m={4}
        onClick={() => setSelectedFile(null)}
      >
        ← All files
      </Button>
      <Box width={"100%"} alignItems={"center"} pt={5}>
        <Box
          p={3}
          borderRadius="md"
          boxShadow="base"
          bgColor={"gray.300"}
          //   _hover={{ bg: "blue.100", cursor: "pointer" }}
          // onClick={() => setSelectedFile(file)}
        >
          <Tooltip label={"Reviewed"}>
            <HStack>
              <Icon as={MdCheckCircle} color={"green.600"} />
              <Text overflow={"hidden"}>
                {selectedFile.pdfName.split("/")[1]}
              </Text>
            </HStack>
          </Tooltip>
        </Box>
      </Box>
      <HStack width={"100%"}>
        <FormControl>
          <FormLabel>Invoice Number</FormLabel>
          <Input
            // value={invoiceNum}
            // onChange={(e) => setInvoiceNum(e.target.value)}
            value={selectedFile.extractedData.invoice}
            // onChange={(e) => setInvoiceNum(e.target.value)}
          />
        </FormControl>
      </HStack>
      <HStack width={"100%"}>
        <FormControl>
          <FormLabel>Invoice Date</FormLabel>
          <Input
            value={selectedFile.extractedData.date}
            // onChange={(e) => setInvoiceDate(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Balance</FormLabel>
          <Input
            value={selectedFile.extractedData.balance}
            // onChange={(e) => setInvoiceBalance(e.target.value)}
          />
        </FormControl>
      </HStack>
      {/* <Button
        colorScheme="blue"
        color={"white"}
        w={"8rem"}
        position={"absolute"}
        bottom={0}
        right={0}
        m={4}
        // onClick={() => setCurrentStep((currentStep) => currentStep + 1)}
      > */}
        <AlertDialogComp
          btnTitle={"Next"}
          header={"Mark Complete"}
          body={"Are you sure the extracted data match?"}
          footerBtnTitle={"Save and continue"}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          extractedFiles={extractedFiles}
        />
      {/* </Button> */}
    </VStack>
  );
};

export default Data;
