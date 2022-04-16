import React from "react";
import Grid from "@mui/material/Grid";
import Product from "./Product/Product";
import useStyles from "./styles";

// const products = [
//   {
//     id: 1,
//     name: "Shoes",
//     description: "Running shoes",
//     price: "$5",
//     image:
//       "https://images.unsplash.com/photo-1597892657493-6847b9640bac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cnVubmluZyUyMHNob2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     id: 2,
//     name: "Macbook",
//     description: "Apple Macbook",
//     price: "$10",
//     image:
//       "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWFjYm9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
//   },
// ];

const Products = ({ products, handleAddToCart }) => {
  const classes = useStyles();
  return (
    <>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container justifyContent='center' spacing={2}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Product product={product} handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      </main>
    </>
  );
};

export default Products;
