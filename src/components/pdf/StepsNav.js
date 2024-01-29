import React, { useState } from "react";
import { Box, HStack, Button, useColorModeValue } from "@chakra-ui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { GrNext } from "react-icons/gr";

const StepsNav = ({ setCurrentStep, currentStep}) => {
  const steps = ["Upload", "Extract", "Approve", "Payment"];
  //   const [currentStep, setCurrentStep] = useState(0);
  const activeBg = useColorModeValue("blue.500", "blue.300");
  const inactiveBg = useColorModeValue("transparent", "trasparent");
  const activeColor = useColorModeValue("white", "gray.200");

  return (
    <Box p={5} overflow="auto">
      <HStack spacing={4} justifyContent="center">
        {steps.map((step, index) => (
          <Button
            rightIcon={<GrNext />}
            key={index}
            // bg={"transparent"}
            border={"1px"}
            borderColor={"gray.200"}
            borderRadius={"24px"}
            bg={currentStep === index ? activeBg : inactiveBg}
            color={currentStep === index ? activeColor : "black"}
            onClick={() => setCurrentStep(index)}
            _hover={{
              bg: currentStep === index ? activeBg : "gray.300",
            }}
          >
            {step}
          </Button>
        ))}
      </HStack>
    </Box>
  );
};

export default StepsNav;
