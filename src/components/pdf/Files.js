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

const Files = ({ extractedFiles, setSelectedFile }) => {
  return (
    <Box height="500px" overflowY="auto">
      <VStack bg={"white"} align="stretch" spacing={3}>
        <Text
          textAlign={"center"}
          fontSize={"1.3rem"}
          fontWeight={"bold"}
          p={2}
        >
          Uploaded Files
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
                <Tooltip label={"Click to review"}>
                  <HStack>
                    <Icon as={MdCheckCircle} color={"green.600"} />
                    <Text overflow={"hidden"}>{file.pdfName.split("/")[1]}</Text>
                  </HStack>
                </Tooltip>

                {/* <Tooltip label={"In Progress"}>
                  <HStack>
                    <Icon as={MdIncompleteCircle} color={"orange.600"} />
                    <Text>{file.pdfName.split("/")[1]}</Text>
                  </HStack>
                </Tooltip>

                <Tooltip label={"Not Started"}>
                  <HStack>
                    <Icon as={MdCancel} color={"red.600"} />
                    <Text>{file.pdfName.split("/")[1]}</Text>
                  </HStack>
                </Tooltip> */}
              </Box>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
};

export default Files;
