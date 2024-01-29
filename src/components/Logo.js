import React from "react";
import { Box, HStack, Image } from "@chakra-ui/react";

const Logo = () => {
  return (
    <HStack height={"100%"} spacing={0}>
      <Image height={"100%"} p={2} src={process.env.PUBLIC_URL + "/logo.png"} />
      <Box fontWeight={"bold"} fontSize={"20px"}>
        InvoiSync
      </Box>
    </HStack>
  );
};

export default Logo;
