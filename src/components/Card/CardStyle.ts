import styled from 'styled-components';

export const CardContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 15px;
  padding: 15px;
  width: 20%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  margin: 5px;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  border-radius: 15px;
  object-fit: cover;
`;

export const ProductTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
  text-align: center;
`;

export const ProductPrice = styled.p`
  font-size: 12px;
  font-weight: bold;
  text-align: right;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

export const AddToCartButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

export const FavoriteIcon = styled.div`
cursor: pointer;
font-size: 24px;
`;
