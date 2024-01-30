import React from "react";
import { Progress, Box, Flex, Text, Circle } from "@chakra-ui/react";

const steps = [
  "My Information",
  "My Experience",
  "Application Questions",
  "Voluntary Disclosures",
  "Review",
];

const ProgressBar = ({ currentStep }) => {

  const getStatusProps = (index, currentStepIndex) => {
    if (index < currentStepIndex) {
      return {
        color: 'green.500', // Color for completed steps
        children: '✓', // Icon or text for completed steps
      };
    } else if (index === currentStepIndex) {
      return {
        color: 'blue.500', // Color for the current step
        children: '', // Icon or text for the current step
      };
    } else {
      return {
        color: 'gray.200', // Color for not started steps
        children: '', // Icon or text for not started steps
      };
    }
  };

  // Calculate the progress value
  const currentStepIndex = steps.indexOf(currentStep);
  const progressValue = ((steps.indexOf(currentStep) + 1) / steps.length) * 100;

  return (
    <Flex direction="column" width="full" p={5}>
      <Progress value={progressValue} size="sm" colorScheme="blue" hasStripe isAnimated />
      <Flex justify="space-between" mt={2}>
        {steps.map((step, index) => {
          const { color, children } = getStatusProps(index, currentStepIndex);

          return (
            <Flex key={step} direction="column" align="center">
              <Circle size="8" bg={color} color="white">
                <Text fontSize="xs">{children}</Text>
              </Circle>
              <Text fontSize="sm" mt={2} fontWeight={index === currentStepIndex ? 'bold' : 'normal'}>
                {step}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default ProgressBar;
