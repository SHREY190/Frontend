import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  position,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/product";
import { useToast } from "@chakra-ui/react";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);

  const { createProducts } = useProductStore();
  const toast = useToast();

  useEffect(() => {
    if (
      newProduct.name.length > 0 &&
      newProduct.price.length > 0 &&
      newProduct.image.length > 0
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    // console.log("newProduct", newProduct);
  }, [newProduct]);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    const { success, message } = await createProducts(newProduct);
    console.log("Success", success);
    console.log("Message", message);
    if (success) {
      setNewProduct({
        name: "",
        price: "",
        image: "",
      });
      toast({
        title: "Product added.",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      toast({
        title: "Error adding product.",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
            />
            <Input
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={handleChange}
            />

            <Button
              colorScheme="blue"
              w={"full"}
              onClick={handleAddProduct}
              disabled={isDisabled}
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
