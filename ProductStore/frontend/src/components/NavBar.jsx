import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { PiPlusSquare } from "react-icons/pi"; // Icon for "add product"
import { IoMoon } from "react-icons/io5"; // Icon for dark mode
import { LuSun } from "react-icons/lu"; // Icon for light mode

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode(); // Chakra UI hook for theme switching

  return (
    <Container maxW={"1120px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column", // Stack vertically on small screens
          sm: "row", // Row layout on small screens and up
        }}
      >
        {/* Logo / Title */}
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        {/* Buttons Section */}
        <HStack spacing={2} alignItems={"center"}>
          {/* Link to Create Product Page */}
          <Link to={"/create"}>
            <Button>
              <PiPlusSquare fontSize={20} />
            </Button>
          </Link>

          {/* Theme Toggle Button */}
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default NavBar;
