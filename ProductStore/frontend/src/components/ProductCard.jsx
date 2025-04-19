import {
  Box,
  HStack,
  Heading,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Button,
  Input,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  // Chakra UI hook to manage color modes
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  // Functions from the product store to delete and update products
  const { deleteProducts, updateProducts } = useProductStore();

  // Chakra UI hook to show toast notifications
  const toast = useToast();

  // Chakra UI hook to control modal visibility
  const { isOpen, onOpen, onClose } = useDisclosure();

  // State to hold the updated product values
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });

  // Handle changes to the input fields in the modal
  const handleChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  // Update product using data from the modal
  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProducts(pid, updatedProduct);
    // console.log("Success", success);
    // console.log("Message", message);
    onClose();

    if (success) {
      setUpdatedProduct({
        name: "",
        price: "",
        image: "",
      });
      toast({
        title: "Product Updated.",
        description: "Product updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error updating product.",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Delete a product by ID
  const handleDelete = async (pid) => {
    const { success, message } = await deleteProducts(pid);
    if (success) {
      toast({
        title: "Product Deleted.",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error deleting product.",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      {/* Product image */}
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w={"full"}
        objectFit={"cover"}
      />

      {/* Product details */}
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          ${product.price}
        </Text>

        {/* Edit and Delete buttons */}
        <HStack spacing={2}>
          <IconButton
            icon={<EditIcon />}
            onClick={onOpen}
            colorScheme="blue"
          ></IconButton>
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDelete(product._id)}
            colorScheme="red"
          ></IconButton>
        </HStack>
      </Box>

      {/* Modal for updating product details */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={handleChange}
              />
              <Input
                placeholder="Price"
                name="price"
                value={updatedProduct.price}
                onChange={handleChange}
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={handleChange}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update Details
            </Button>
            <Button variant={"ghost"} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
