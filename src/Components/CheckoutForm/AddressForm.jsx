import React from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./CustomTextField";

const AddressForm = () => {
  const methods = useForm();
  return (
    <>
      <Typography variant='h5' gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <Grid container spacing={3}>
          <FormInput required name='firstName' label='First name' />
          <FormInput required name='firstName' label='First name' />
          <FormInput required name='firstName' label='First name' />
          <FormInput required name='firstName' label='First name' />
          <FormInput required name='firstName' label='First name' />
          <FormInput required name='firstName' label='First name' />
        </Grid>
      </FormProvider>
    </>
  );
};

export default AddressForm;
