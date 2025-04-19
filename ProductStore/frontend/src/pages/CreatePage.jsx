import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/product";
import { useToast } from "@chakra-ui/react";

const CreatePage = () => {
  // Local state to hold new product input fields
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  // Button disabled state, initially true
  const [isDisabled, setIsDisabled] = useState(true);

  // Access the createProducts function from Zustand store
  const { createProducts } = useProductStore();

  // Toast hook for showing success/error messages
  const toast = useToast();

  // Enable/disable the submit button based on input validity
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
  }, [newProduct]);

  // Update local state when input fields change
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Handle adding the new product
  const handleAddProduct = async () => {
    const { success, message } = await createProducts(newProduct);

    if (success) {
      // Clear form fields on success
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
      });
    } else {
      toast({
        title: "Error adding product.",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        {/* Page heading */}
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        {/* Form container */}
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            {/* Input fields for product details */}
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

            {/* Add Product button */}
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
