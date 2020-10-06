import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/core";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addContact, updateContact } from "../contactListSlice";
import axios from "axios";

export default function ContactForm({ contact, onClose }) {
  const {
    handleSubmit,
    errors,
    setError,
    register,
    formState,
    reset,
  } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (contact) {
      reset({ ...contact });
    }
  }, [reset, contact]);

  async function onSubmit(values) {
    if (contact) {
      try {
        const response = await axios({
          method: "put",
          url: `/api/contacts/${contact.id}`,
          headers: {
            "Content-Type": "application/json",
          },
          data: values,
        });

        dispatch(updateContact(response.data));
        reset({ ...contact });
        onClose();
      } catch (error) {
        setError(error.response.data.field, {
          type: "api",
          message: error.response.data.error,
        });
      }
    } else {
      try {
        const response = await axios({
          method: "post",
          url: "/api/contacts",
          headers: {
            "Content-Type": "application/json",
          },
          data: values,
        });
        dispatch(addContact(response.data));
        reset();
      } catch (error) {
        setError(error.response.data.field, {
          type: "api",
          message: error.response.data.error,
        });
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name} mt={4}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          name="name"
          placeholder="name"
          ref={register({ required: "Name is required" })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.email} mt={4}>
        <FormLabel htmlFor="name">Email</FormLabel>
        <Input
          name="email"
          placeholder="email"
          ref={register({ required: "Email is required" })}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.phone} mt={4}>
        <FormLabel htmlFor="phone">Phone</FormLabel>
        <Input
          name="phone"
          placeholder="phone"
          ref={register({ required: "Phone is required" })}
        />
        <FormErrorMessage>
          {errors.phone && errors.phone.message}
        </FormErrorMessage>
      </FormControl>

      <Button
        type="submit"
        variantColor="teal"
        isLoading={formState.isSubmitting}
        mt={4}
      >
        {contact ? "Save" : "Add Contact"}
      </Button>
      {contact && (
        <Button mt={4} ml={2} onClick={onClose} variantColor="red">
          Cancel
        </Button>
      )}
    </form>
  );
}
