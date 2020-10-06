import { Box, Button, Spinner, Text } from "@chakra-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactsAsync, removeContact } from "../contactListSlice";
import UpdateContactModal from "./UpdateContactModal";
import axios from "axios";

export default function ContactList() {
  const { contacts, loading, error } = useSelector(
    (state) => state.contactList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsAsync());
  }, [dispatch]);

  const remove = async (id) => {
    await axios({
      method: "delete",
      url: `/api/contacts/${id}`,
    });

    dispatch(removeContact(id));
  };

  if (loading) {
    return (
      <Box mt={8} borderTop="1px solid lightgrey" textAlign="center">
        <Spinner mx="auto" mt={8} size="lg" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={8} borderTop="1px solid lightgrey" textAlign="center">
        <Text color="#ff0000" mt={8}>
          Error: {error}
        </Text>
      </Box>
    );
  }

  return (
    <Box mt={8} borderTop="1px solid lightgrey">
      {contacts.length > 0 ? (
        contacts.map((contact) => (
          <Box key={contact.id} py={4}>
            <Button
              onClick={() => remove(contact.id)}
              variantColor="red"
              float="right"
            >
              Remove
            </Button>
            <UpdateContactModal contact={contact} />
            <Text>{contact.name}</Text>
            <Text>{contact.email}</Text>
            <Text>{contact.phone}</Text>
          </Box>
        ))
      ) : (
        <Text py={4}>You haven't added any contacts yet.</Text>
      )}
    </Box>
  );
}
