import React from "react";
import { Box, HStack } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Cards from "./Cards";

const Dash = () => {
  return (
    <Box bg={"white"}>
      <Navbar />
      <HStack alignItems={"flex-start"}>
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
