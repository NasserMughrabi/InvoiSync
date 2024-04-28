import React, { useState } from "react";
import { Box, HStack, Button, useColorModeValue } from "@chakra-ui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { GrNext } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";

const StepsNav = ({ setCurrentStep, currentStep }) => {
  const steps = ["Upload", "Extract", "Review", "Code", "Approve", "Payment"];
  //   const [currentStep, setCurrentStep] = useState(0);
  const activeCompleteBg = useColorModeValue("blue.500", "blue.300");
  const inactiveBg = useColorModeValue("transparent", "trasparent");
  const activeCompleteColor = useColorModeValue("white", "gray.200");

  return (
    <Box p={5} overflow="auto">
      <HStack spacing={4} justifyContent="center">
        {steps.map((step, index) => (
          <Button
            rightIcon={index === 5 ? "" : index < currentStep ? <FaCheck /> : <GrNext />}
            key={index}
            // bg={"transparent"}
            border={"1px"}
            borderColor={"gray.200"}
            borderRadius={"24px"}
            bg={
              index < currentStep || index === currentStep
                ? activeCompleteBg
                : inactiveBg
            }
            color={
              currentStep === index || index < currentStep
                ? activeCompleteColor
                : "black"
            }
            _hover={{
              bg: currentStep === index || index < currentStep ? activeCompleteBg : "gray.300",
            }}
            onClick={() => setCurrentStep(index)}
          >
            {step}
          </Button>
        ))}
      </HStack>
    </Box>
  );
};

export default StepsNav;
