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
  Center,
} from "@chakra-ui/react";

const Cards = () => {
  const cards = [1, 2, 3];
  return (
    <Flex
      height={"93vh"}
      alignItems={"center"}
    >
      {cards.map((card) => {
        return (
          // <Container
          //   // my="12"
          //   // display={"flex"}
          //   // display={isOpen ? "none" : "flex"}
          //   // justifyContent={"center"}
          //   // alignItems={"center"}
          //   height={"290px"}
          //   m={2}
          //   bg={"white"}
          //   p={4}
          //   borderRadius={8}
          // >
          <AspectRatio
            width="64"
            ratio={1}
            bg={"white"}
            borderRadius={10}
            p={4}
            m={2}
            h={"240px"}
            
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
                shadow: "md",
              }}
              // as={motion.div}
              initial="rest"
              animate="rest"
              whileHover="hover"
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
                    {/* <Box height="16" width="12" position="relative">
                      <PreviewImage
                        variants={first}
                        backgroundImage="url('https://t4.ftcdn.net/jpg/05/60/45/97/240_F_560459792_f8KCb2ZdaIZzZrEA2HaQ5erYCtT8wlcu.jpg')"
                      />
                      <PreviewImage
                        variants={second}
                        backgroundImage="url('https://t4.ftcdn.net/jpg/05/60/45/97/240_F_560459798_cMFsMWIxvNs2OGfZjtN8eYRmN0oIiZ0b.jpg')"
                      />
                      <PreviewImage
                        variants={third}
                        backgroundImage={`url("https://t3.ftcdn.net/jpg/05/60/45/98/240_F_560459822_Hp4aIPk2EMYkDaiCPTthDL9kgndWr16J.jpg")`}
                      />
                    </Box> */}
                    <Stack p="8" textAlign="center" spacing="1">
                      <Heading fontSize="lg" color="black" fontWeight="bold">
                        Drop invoices here
                      </Heading>
                      <Text fontWeight="light" color={"black"}>
                        or click to upload
                      </Text>
                    </Stack>
                  </Stack>
                </Box>
                <Input
                  multiple
                  type="file"
                  height="100%"
                  width="100%"
                  position="absolute"
                  top="0"
                  left="0"
                  opacity="0"
                  aria-hidden="true"
                  accept="application/pdf"
                  // onDragEnter={startAnimation}
                  // onDragLeave={stopAnimation}
                  // cursor={"pointer"}
                  // onChange={handleUpload}
                />
              </Box>
            </Box>
          </AspectRatio>
          // </Container>
        );
      })}
    </Flex>
  );
};

export default Cards;
