import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';
import { addFavorite, removeFavorite } from '../../redux/slices/favoriteSlice';
import { CardProps } from '../../types/productInterface';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; 
import Button from "../UI/Button/Button";
import { CardContainer, ProductImage, ProductTitle, ProductPrice, ButtonContainer, FavoriteIcon } from "../Card/CardStyle";
import { RootState, AppDispatch } from '../../redux/store';
import { useRouter } from 'next/navigation'; 

const Card: React.FC<CardProps> = ({ product }) => {
  const router = useRouter()  
  const dispatch: AppDispatch = useDispatch();

  const isFavorite = useSelector((state: RootState) => 
    state.favorites.items.some((item) => item.id === product.id)
  );

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  const handleViewDetails = () => {
    router.push(`/product/${product.id}`);
  };

  const handleAddToFavorites = () => {
    if (isFavorite) {
      dispatch(removeFavorite(product.id));
    } else {
      dispatch(addFavorite(product));
    }
  };

  return (
    <CardContainer>
      <ProductImage src={product.image} alt={product.title} />
      <ProductTitle>{product.title}</ProductTitle>
      <ProductPrice>${product.price}</ProductPrice>
      <ButtonContainer>
        <Button onClick={handleAddToCart} label="Agregar" />
        <Button onClick={handleViewDetails} label="Detalles" />
        <FavoriteIcon onClick={handleAddToFavorites}>
            {isFavorite ? <AiFillHeart color="#ff0000" /> : <AiOutlineHeart color="#ff0000" />}
          </FavoriteIcon>
      </ButtonContainer>
    </CardContainer>
  );
};

export default Card;
