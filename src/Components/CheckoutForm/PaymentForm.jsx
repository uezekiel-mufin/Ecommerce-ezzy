import React from "react";
import { Typography, Button, Divider } from "@mui/material";
import {
  Elements,
  CardElement,
  ElementConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import Review from "./Review";
import Review from "./Review";
const stripePromise = loadStripe(
  "pk_test_51Kq2eHJElICB3CJXTZRN0p4Mo09wSDhWf8VdFrUlsGItRIcAEyO5X9le2wWrcw4QUZZsChHKYF7c9WPASMSpY4iU00CeTdMQnO"
);

console.log(Review);
const PaymentForm = ({
  checkoutToken,
  checkoutTokenId,
  backStep,
  shippingData,
  onCaptureCheckout,
  nextStep,
}) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
          shipping: {
            name: "Primary",
            street: shippingData.address1,
            town_city: shippingData.city,
            country_state: shippingData.shippingSubdivision,
            postal_zip_code: shippingData.zip,
            country: shippingData.shippingCountry,
          },
          fulfillment: { shipping_method: shippingData.shippingOption },
          payment: {
            gateway: "stripe",
            stripe: {
              payment_method_id: paymentMethod.id,
            },
          },
        },
      };
      onCaptureCheckout(checkoutTokenId, orderData);
      nextStep();
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant='h6' gutterBottom style={{ margin: "20px 0" }}>
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /> <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant='outlined' onclick={backStep}>
                  Back
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  disabled={!stripe}
                  color='primary'
                >
                  Pay{checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
