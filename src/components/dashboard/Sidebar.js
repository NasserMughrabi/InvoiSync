import React, { useState } from "react";
import {
  Box,
  HStack,
  VStack,
  Icon,
} from "@chakra-ui/react";
import SidebarData from "./data/SidebarData";

const Sidebar = () => {
  const [selected, setSelected] = useState("Create New");
  return (
    <VStack
      height={"93vh"}
      minWidth={"220px"}
      bg={"gray.100"}
      // bg={"#2e5469"}
      alignItems={"flex-start"}
      spacing={6}
    >
      {SidebarData.map((field, index) => {
        return (
          <VStack key={index} alignItems={"left"} w={"100%"} spacing={0}>
            <HStack bg={"gray.300"} p={2} mb={1} width={"100%"}>
              <Icon as={field.icon} />
              <Box>{field.label}</Box>
            </HStack>
            {field.items.map((item, index) => {
              return (
                <Box
                  bg={selected === item ? "blue.400" : "none"}
                  key={index}
                  pl={8}
                  py={"4px"}
                  mb={1}
                  cursor={"pointer"}
                  _hover={{ bg: "blue.400" }}
                  onClick={() => setSelected(item)}
                >
                  {item}
                </Box>
              );
            })}
          </VStack>
        );
      })}
    </VStack>
  );
};

export default Sidebar;
