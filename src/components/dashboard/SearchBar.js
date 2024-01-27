import React, { ReactElement, ReactNode } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export const SearchBar = () => {
  return (
    <>
      <InputGroup borderRadius={5} size="sm">
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="white" />}
        />
        <Input type="text" placeholder="Search..." border="1px solid white" />
        <InputRightAddon
          p={0}
          border="none"
        >
          <Button size="sm" borderLeftRadius={0} borderRightRadius={3.3} border="1px solid white">
            Search
          </Button>
        </InputRightAddon>
      </InputGroup>
    </>
  );
};
