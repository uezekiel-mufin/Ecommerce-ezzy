import React from "react";
import { TextField, Grid } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label, required }) => {
  const { control } = useFormContext();
  return (
    <Grid item xs={12} sm={6}>
      <Controller
        as={TextField}
        control={control}
        fullWidth
        name={name}
        label={label}
        required={required}
        // placeHolder
        render={({ field }) => {
          return <input {...field} placeholder={label} />;
        }}
      />
    </Grid>
  );
};

export default FormInput;
