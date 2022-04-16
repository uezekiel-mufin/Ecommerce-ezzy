import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import Logo from "../../assets/commerce.jpg";
import useStyles from "./styles";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ cart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(navigate);
  console.log(location.pathname);
  const showCart = () => {
    navigate("/cart");
  };
  const classes = useStyles();
  console.log(cart);
  return (
    <>
      <AppBar position='fixed' className={classes.appBar} color='inherit'>
        <Toolbar className={classes.image}>
          <Typography
            component={Link}
            to='/'
            variant='h6'
            className={classes.title}
            color='inherit'
          >
            <img
              src={Logo}
              alt='Ezzy-Commerce'
              height='25px'
              className={classes.image}
            />
            Ezzy Commerce
          </Typography>
          <div className={classes.grow} />
          <div className={classes.button}>
            {location.pathname === "/" && (
              <IconButton
                aria-label='Show cart items'
                color='inherit'
                onClick={() => showCart()}
              >
                <Badge badgeContent={cart.total_items} color='secondary'>
                  <ShoppingCart />
                </Badge>
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
