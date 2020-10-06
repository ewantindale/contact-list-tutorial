import React from "react";
import { Heading, Box } from "@chakra-ui/core";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
  return (
    <Box maxW="500px" mx="auto">
      <Heading>Contact List</Heading>
      <ContactForm />
      <ContactList />
    </Box>
  );
}

export default App;
