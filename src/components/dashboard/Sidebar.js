import React, { useState } from "react";
import {
  AspectRatio,
  Box,
  BoxProps,
  Container,
  forwardRef,
  Heading,
  Input,
  Stack,
  Text,
  Progress,
  Flex,
  CircularProgress,
  CircularProgressLabel,
  Button,
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
  Center,
  HStack,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { FaFileInvoiceDollar, FaChartArea, FaTruck } from "react-icons/fa";
import { MdApproval } from "react-icons/md";

const fields = [
  {
    label: "Invoice Processing",
    items: ["Create New", "In-progress", "Resolution"],
    icon: FaFileInvoiceDollar,
  },
  {
    label: "Approvals",
    items: ["Pending Approvals", "Delegated Approvals", "Approval Histroy"],
    icon: MdApproval,
  },
  {
    label: "Vendor Management",
    items: ["Add New", "Vendor Profiles"],
    icon: FaTruck,
  },
  {
    label: "Analytics",
    items: ["Financial Reports", "Vendor Reports", "Audit Trails"],
    icon: FaChartArea,
  },
];

const Sidebar = () => {
  const [selected, setSelected] = useState("Create New");
  return (
    <VStack
      height={"93vh"}
      width={"220px"}
      bg={"gray.100"}
      alignItems={"flex-start"}
      spacing={6}
    >
      {fields.map((field, index) => {
        return (
          <VStack key={index} alignItems={"left"} w={"100%"} spacing={0}>
            <HStack bg={"gray.300"} p={2} mb={1} width={"100%"}>
              <Icon as={field.icon} />
              <Box>{field.label}</Box>
            </HStack>
            {field.items.map((item, index) => {
              return (
                <Box
                  bg={selected === item ? "cyan.500" : "none"}
                  key={index}
                  pl={8}
                  py={"4px"}
                  cursor={"pointer"}
                  _hover={{ bg: "cyan.500" }}
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
