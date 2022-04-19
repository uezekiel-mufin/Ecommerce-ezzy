import React, { useState, useEffect } from "react";
import { Paper, Stepper, Step, StepLabel, Typography } from "@mui/material";
import useStyles from "./styles";
import PaymentForm from "../PaymentForm";
import AddressForm from "../AddressForm";
import Confirmation from "../Confirmation";
import { commerce } from "../../../lib/commerce";
const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const classes = useStyles();
  const steps = ["Shipping address", "Payment details"];
  const [checkoutTokenId, setCheckoutTokenId] = useState(null);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });

        setCheckoutToken(token);
        setCheckoutTokenId(token.id);
      } catch (error) {
        console.log(error);
      }
    };
    generateToken();
  }, [cart.id]);
  const nextStep = () => {
    setActiveStep(activeStep + 1);
    console.log(activeStep);
  };
  const backStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const next = (data) => {
    setShippingData(data);
    nextStep();
  };
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutTokenId={checkoutTokenId} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
        nextStep={nextStep}
        checkoutTokenId={checkoutTokenId}
      />
    );

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
