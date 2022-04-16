import React from "react";
import {
  Grid,
  Typography,
  IconButton,
  CardActions,
  Button,
} from "@mui/material";
import { CardMedia, Card, CardContent } from "@mui/material";
import useStyles from "./styles";
const CartItem = ({ item, handleUpdate, handleRemoveFromCart }) => {
  const classes = useStyles();
  console.log(item);

  return (
    <>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={item.image.url}
          alt={item.name}
          title={item.name}
        />
        <CardContent className={classes.cardContent}>
          <div>
            <Typography variant='h5' gutterBottom>
              {item.name}
            </Typography>
          </div>
          <div>
            <Typography variant='h5'>
              {item.price.formatted_with_symbol}
            </Typography>
          </div>
          <Typography
            variant='body2'
            color='textSecondary'
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        </CardContent>
        <CardActions className={classes.CardActions}>
          <div className={classes.buttons}>
            <Button
              type='button'
              size='small'
              onClick={() => handleUpdate(item.id, item.quantity - 1)}
            >
              -
            </Button>
            <Typography>{item.quantity}</Typography>
            <Button
              type='button'
              size='small'
              onClick={() => handleUpdate(item.id, item.quantity + 1)}
            >
              +
            </Button>
          </div>
          <Button
            variant='contained'
            type='button'
            color='secondary'
            onClick={() => handleRemoveFromCart(item.id)}
          >
            Remove
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default CartItem;
