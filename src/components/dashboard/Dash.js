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
  Center,
} from "@chakra-ui/react";
import colors from "../../colors";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Cards from "./Cards";

const Dash = () => {
  return (
    <Box bg={"#244f66"}>
      <Navbar />
      <HStack>
        <Sidebar />
        <Cards />
      </HStack>
    </Box>
    // <Grid
    //   h="100vh"
    //   templateRows="repeat(12, 1fr)"
    //   templateColumns="repeat(12, 1fr)"
    // >
    //   <GridItem rowSpan={1} colSpan={12}>
    //     <Navbar />
    //   </GridItem>
    //   <GridItem rowSpan={11} colSpan={12} bg="#0f3c4c">
    //     <Flex gridRow="span 11">
    //       <Sidebar />
    //       <Cards />
    //     </Flex>
    //   </GridItem>
    // </Grid>
  );
};

export default Dash;
