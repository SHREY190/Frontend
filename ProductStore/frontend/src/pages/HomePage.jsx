import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  // Destructure fetchProducts and products from the product store
  const { fetchProducts, products } = useProductStore();

  // Fetch all products on component mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        {/* Title section */}
        <Text
          fontSize={30}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          Current Products
        </Text>

        {/* Grid layout for displaying product cards */}
        <SimpleGrid
          columns={{
            base: 1, // 1 column on small screens
            md: 2, // 2 columns on medium screens
            lg: 3, // 3 columns on large screens
          }}
          spacing={10}
          w={"full"}
        >
          {/* Render a ProductCard for each product */}
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {/* If no products are available, show a message with a link to create one */}
        {products.length === 0 && (
          <Text
            fontSize={"xl"}
            fontWeight={"bold"}
            alignItems={"center"}
            color={"gray.500"}
          >
            No products found 🥲{"  "}
            <Link to={"/create"}>
              <Text
                as={"span"}
                color={"blue.500"}
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
