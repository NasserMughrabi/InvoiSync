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
  Link,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { MdCheckCircle, MdIncompleteCircle, MdCancel } from "react-icons/md";
import colors from "../../colors";

const Files = ({ extractedFiles, setSelectedFile, extracting, progress }) => {
  const iconChoice = (extractedFile) => {
    if (extractedFile.status === "approved") {
      return MdCheckCircle;
    } else if (extractedFile.status === "inprogress") {
      return MdIncompleteCircle;
    } else {
      return MdCancel;
    }
  };

  const iconColor = (extractedFile) => {
    if (extractedFile.status === "approved") {
      return "green.600";
    } else if (extractedFile.status === "inprogress") {
      return "orange.600";
    } else {
      return "red.600";
    }
  };

  const iconTip = (extractedFile) => {
    if (extractedFile.status === "approved") {
      return "Reviewed";
    } else if (extractedFile.status === "inprogress") {
      return "Incomplete review";
    } else {
      return "Await review";
    }
  };

  return (
    <Box height="500px" overflowY="auto">
      <VStack align="stretch" spacing={3}>
        <Text
          textAlign={"center"}
          fontSize={"1.3rem"}
          fontWeight={"bold"}
          p={2}
        >
          Files
        </Text>
        {extractedFiles.map((file, index) => {
          return (
            <Box key={index} width={"100%"} alignItems={"center"} px={"4px"}>
              <Box
                p={3}
                borderRadius="md"
                boxShadow="base"
                bgColor={"gray.300"}
                _hover={{ bg: "blue.100", cursor: "pointer" }}
                onClick={() => setSelectedFile(file)}
              >
                <HStack justifyContent={"space-between"}>
                  <HStack>
                    <Tooltip label={iconTip(file)}>
                      <Stack justifyContent={"center"}>
                        <Icon as={iconChoice(file)} color={iconColor(file)} />
                      </Stack>
                    </Tooltip>
                    <Text overflow={"hidden"}>
                      {file.pdfName.split("/")[1]}
                    </Text>
                  </HStack>
                  {progress[index] < 100 ? (
                    <CircularProgress
                      value={progress[index]}
                      color={colors.blue500}
                      thickness="12px"
                      size={"30px"}
                    />
                  ) : (
                    <Button variant={"outline"}>Review</Button>
                  )}
                </HStack>
              </Box>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
};

export default Files;
