import * as React from 'react';
import { Badge, IconButton, Toolbar, Box, AppBar, Typography } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useState } from 'react';
import CartPage from './CartPage';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useCart } from './CartContext';

export default function NavBar() {
  const [stateCart, setStateCart] = useState(false);

  const handleCartToggle = () => {
    setStateCart(!stateCart);
  };
  const { cartItems } = useCart();
  return (
    <Box className='navBar-container'>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            href='https://www.linkedin.com/in/ollocco/'
            target="_blank"
          >
            <LinkedInIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Shopping Cart
          </Typography>
          <Badge badgeContent={cartItems.length} color="secondary">
            <ShoppingCart fontSize='large' color='inherit' onClick={handleCartToggle} />
          </Badge>
        </Toolbar>
      </AppBar>
      {/* Renderizar el CartPage solo si isCartOpen es true */}
      {stateCart && <CartPage isOpen={stateCart} onClose={handleCartToggle} />}
    </Box>
  );
}
