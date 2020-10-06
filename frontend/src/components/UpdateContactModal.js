import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/core";
import React from "react";
import ContactForm from "./ContactForm";

export default function UpdateContactModal({ contact }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} variantColor="blue" float="right" mr={2}>
        Update
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Contact</ModalHeader>
          <ModalBody>
            <ContactForm contact={contact} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
