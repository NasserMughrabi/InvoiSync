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
} from "@chakra-ui/react";

const AlertDialogComp = ({
  btnTitle,
  header,
  body,
  footerBtnTitle,
  selectedFile,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handleConfirm = () => {
    onClose();
    // selectedFile.status = "approved";
  };

  return (
    <Box>
      <Button colorScheme="blue" w={"8rem"} onClick={onOpen}>
        {btnTitle}
      </Button>

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
