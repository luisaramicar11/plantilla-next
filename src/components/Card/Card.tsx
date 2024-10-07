import { CardProps } from '../../types/productInterface';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; 
import Button from "../UI/Button/Button"
import { CardContainer, ProductImage, ProductTitle, ProductPrice, ButtonContainer, FavoriteIcon} from "../Card/CardStyle"

const Card: React.FC<CardProps> = ({ product }) => {
 
  const handleAddToCart = () => {
    console.log("add to cart")
  };

  const handleAddToLike = () => {
    console.log("add to Likes")
  };

  return (
    <>
      <CardContainer>
        <ProductImage src={product.image} alt={product.title} />
        <ProductTitle>{product.title}</ProductTitle>
        <ProductPrice>${product.price}</ProductPrice>
        <ButtonContainer>
          <Button onClick={handleAddToCart} label="Agregar"/>
          <FavoriteIcon onClick={handleAddToLike}>
            {<AiFillHeart color="#ff0000" />}
          </FavoriteIcon>
        </ButtonContainer>
      </CardContainer>
    </>
  );
};

export default Card;