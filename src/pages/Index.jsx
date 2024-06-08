import React, { useState } from "react";
import { Container, VStack, Text, Input, Textarea, Button, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import emailjs from "emailjs-com";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData, "YOUR_USER_ID")
      .then((response) => {
        toast({
          title: "Application Sent.",
          description: "Your job application has been sent successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      })
      .catch((error) => {
        toast({
          title: "Error.",
          description: "There was an error sending your application. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Text fontSize="2xl">Apply for a Job</Text>
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} />
        </FormControl>
        <FormControl id="message" isRequired>
          <FormLabel>Message</FormLabel>
          <Textarea name="message" value={formData.message} onChange={handleChange} />
        </FormControl>
        <Button type="submit" colorScheme="teal" size="md">
          Submit
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
