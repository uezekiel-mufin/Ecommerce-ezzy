import React from "react";
import { Grid, Typography, Button, Container } from "@mui/material";
import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";

const Cart = ({
  cart,
  handleUpdate,
  handleEmptyCart,
  handleRemoveFromCart,
}) => {
  const classes = useStyles();

  const EmptyCart = () => {
    return (
      <Typography variant='subtitle1'>
        You have no item in your shopping cart,{" "}
        <Link to='/' className={classes.link}>
          start adding some!
        </Link>
      </Typography>
    );
  };

  const FilledCart = () => {
    return (
      <>
        <Grid container spacing={3}>
          {cart.line_items.map((item) => {
            return (
              <Grid item xs={12} sm={4} key={item.id}>
                <CartItem
                  handleUpdate={handleUpdate}
                  handleRemoveFromCart={handleRemoveFromCart}
                  item={item}
                />
              </Grid>
            );
          })}
        </Grid>
        <div className={classes.cardDetails}>
          <Typography variant='h4'>
            Subtotal:{cart.subtotal.formatted_with_symbol}
          </Typography>
          <div>
            <Button
              className={classes.emptyButton}
              size='large'
              type='button'
              variant='contained'
              color='secondary'
              onClick={() => handleEmptyCart()}
            >
              Empty Cart
            </Button>
            <Link to='/checkout'>
              <Button
                className={classes.checkoutButton}
                size='large'
                type='button'
                variant='contained'
                color='primary'
              >
                Checkout
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  };

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant='h3' gutterBottom>
        Your Shopping Cart
      </Typography>
      {cart.total_items >= 1 ? <FilledCart /> : <EmptyCart />}
    </Container>
  );
};

export default Cart;
