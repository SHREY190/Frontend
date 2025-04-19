import {
  Box,
  HStack,
  Heading,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import React from "react";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProducts } = useProductStore();
  const toast = useToast();

  const handleDelete = async (pid) => {
    const { success, message } = await deleteProducts(pid);
    if (success) {
      toast({
        title: "Product Deleted.",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      toast({
        title: "Error deleting product.",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
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
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w={"full"}
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} colorScheme="blue"></IconButton>
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDelete(product._id)}
            colorScheme="red"
          ></IconButton>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
