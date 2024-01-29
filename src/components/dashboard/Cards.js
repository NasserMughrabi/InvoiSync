import React from "react";
import {
  AspectRatio,
  Box,
  Heading,
  Stack,
  HStack,
  Text,
  Flex,
  Button,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaCheckCircle, FaHourglassStart } from "react-icons/fa";
import { useState } from "react";
import CardsData from "./data/CardsData";
import { Link } from "react-router-dom";

const Cards = () => {
  return (
    <Flex maxHeight={"93vh"} flexWrap={"wrap"} overflow={"auto"}>
      {CardsData.map((card, index) => (
        <Link to={"Main"}>
          <CardItem key={index} card={card} />
        </Link>
      ))}
    </Flex>
  );
};

const CardItem = ({ card }) => {
  const [showAllvendors, setShowAllvendors] = useState(false);

  const toggleShowAll = () => {
    setShowAllvendors(!showAllvendors);
  };
  return (
    <AspectRatio
      width="64"
      ratio={1}
      borderRadius={10}
      p={4}
      m={2}
      mt={4}
      h={"240px"}
      bg={"gray.100"}
    >
      <Box
        borderColor="#244f66"
        borderStyle="none"
        borderWidth="2px"
        rounded="md"
        shadow="md"
        role="group"
        transition="all 150ms ease-in-out"
        _hover={{
          shadow: "xl",
          scale: "1.98",
        }}
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
              <Stack p="8" textAlign="center" spacing="8" width={"100%"}>
                <HStack width={"100%"}>
                  <Icon as={card.icon} color={"blue.500"} />
                  <Heading fontSize="lg" color="black" fontWeight="bold">
                    {card.label}
                  </Heading>
                </HStack>
                <VStack overflowY={"auto"} maxHeight={"110px"}>
                  {card.vendors
                    .slice(0, showAllvendors ? card.vendors.length : 3)
                    .map((Vendor) => {
                      return (
                        <HStack
                          key={Vendor.name}
                          width={"100%"}
                          justifyContent={"space-between"}
                        >
                          <Text fontWeight="light" color={"black"}>
                            {Vendor.name}
                          </Text>
                          <Text fontWeight="bold" color={"black"}>
                            {Vendor.filesNum} Files
                          </Text>
                        </HStack>
                      );
                    })}
                </VStack>
                {card.vendors.length > 3 && (
                  <Button size="sm" onClick={toggleShowAll}>
                    {showAllvendors ? "See Less" : "See More"}
                  </Button>
                )}
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Box>
    </AspectRatio>
  );
};

export default Cards;
