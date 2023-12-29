import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from './CartContext';  // Asegúrate de importar useCart

export default function Products({id,title,description,price,image,alt}) {
  const { addToCart } = useCart();  // Obtén addToCart del contexto

  const handleAddToCart = () => {
    addToCart(id, title, price, image, alt);  // Llama a addToCart con los parámetros necesarios
  };

  return (
    <Card sx={{ maxWidth: 345, flex:1 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={image}
          alt={alt}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          $ {price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <AddShoppingCartIcon size="small" color="primary" onClick={handleAddToCart}/>
      </CardActions>
    </Card>
  );
}