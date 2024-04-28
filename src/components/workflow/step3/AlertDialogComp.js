import React from "react";
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
  Box,
  IconButton,
  Text,
  HStack,
} from "@chakra-ui/react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const AlertDialogComp = ({
  btnTitle,
  header,
  body,
  footerBtnTitle,
  selectedFile,
  setSelectedFile,
  extractedFiles,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handleConfirm = () => {
    onClose();
    selectedFile.status = "approved";
    if (selectedFile.index + 1 < extractedFiles.length) {
      setSelectedFile(extractedFiles[selectedFile.index + 1]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleNext = () => {
    if (selectedFile.status === "approved") {
      if (selectedFile.index + 1 < extractedFiles.length) {
        setSelectedFile(extractedFiles[selectedFile.index + 1]);
      } else {
        setSelectedFile(null);
      }
    } else {
      onOpen();
    }
  };

  const handlePrev = () => {
    setSelectedFile(extractedFiles[selectedFile.index - 1]);
  };

  return (
    <Box>
      {/* <Button
        colorScheme="blue"
        w={"8rem"}
        onClick={onOpen}
        rightIcon={
          selectedFile.index + 1 >= extractedFiles.length ? (
            ""
          ) : (
            <FaChevronRight />
          )
        }
        leftIcon={selectedFile.index === 0 ? "" : <FaChevronLeft />}
      >
        {extractedFiles.length > 0 ? (
          <>
            {selectedFile.index + 1} of {extractedFiles.length} Files
          </>
        ) : (
          "No Files Selected"
        )}
      </Button> */}

      <HStack>
        <IconButton
          icon={<FaChevronLeft />}
          colorScheme="blue"
          onClick={handlePrev}
          isDisabled={selectedFile.index - 1 < 0}
        />
        <Text>
          {selectedFile.index + 1} of {extractedFiles.length} Files
        </Text>
        <IconButton
          icon={<FaChevronRight />}
          colorScheme="blue"
          onClick={handleNext}
        />
      </HStack>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {header}
            </AlertDialogHeader>

            <AlertDialogBody>{body}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleConfirm} ml={3}>
                {footerBtnTitle}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default AlertDialogComp;
