import React from "react";
import { Box, HStack, Avatar } from "@chakra-ui/react";
// import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import Logo from "../Logo";
// import { SearchBar } from "./SearchBar";

function Navbar() {
  const navItems = [
    "Dashboard",
    "Accounts",
    "History",
    "Access",
    "Help/Support",
  ];

  return (
    <HStack
      width={"100%"}
      height={"7vh"}
      borderColor={"#395f74"}
      bg={"#2e5469"}
      // bg={"blue.500"}
      // borderColor={"blue.500"}
      borderBottomColor={"gray.300"}
      borderWidth="2px"
      shadow="lg"
      role="group"
      transition="all 150ms ease-in-out"
      cursor={"pointer"}
      color={"white"}
      justifyContent={"space-between"}
      pr={2}
    >
      <HStack height={"100%"} spacing={20}>
        <Logo />
        <HStack spacing={6} height={"100%"}>
          {navItems.map((item, index) => {
            return (
              <Box
                p={2}
                fontWeight={"bold"}
                _hover={{ bg: "blue.500", borderRadius: "15px" }}
              >
                {item}
              </Box>
            );
          })}
        </HStack>
      </HStack>
      <HStack spacing={6}>
        {/* <SearchBar /> */}
        <Avatar
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
          size={"sm"}
        />
      </HStack>
    </HStack>
    // <Flex
    //   bg={bgColor}
    //   color="gray.600"
    //   minH="60px"
    //   py={{ base: 2 }}
    //   px={{ base: 4 }}
    //   borderBottom={1}
    //   borderStyle="solid"
    //   borderColor={primaryColor}
    //   align="center"
    // >
    //   <Text
    //     // textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
    //     fontFamily='heading'
    //     color={primaryColor}
    //   >
    //     InvoiSync
    //   </Text>

    //   <Stack
    //     direction="row"
    //     spacing={4}
    //     align="center"
    //     justify="flex-end"
    //     flex={{ base: 1, md: 'auto' }}
    //     ml={{ base: 0, md: 60 }}
    //   >
    //     {/* Icons and other elements go here */}
    //     <IconButton
    //       size="md"
    //       icon={<FaSearch />}
    //       aria-label="Search database"
    //       color={primaryColor}
    //     />
    //     <IconButton
    //       size="md"
    //       icon={<FaBell />}
    //       aria-label="Notifications"
    //       color={primaryColor}
    //     />
    //     <IconButton
    //       size="md"
    //       icon={<FaUserCircle />}
    //       aria-label="Account"
    //       color={primaryColor}
    //     />
    //     {/* More menu items can be added here */}
    //   </Stack>
    // </Flex>
  );
}

export default Navbar;
