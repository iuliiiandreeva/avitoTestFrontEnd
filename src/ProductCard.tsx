// src/ProductCard.tsx
import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

interface ProductCardProps {
  name: string;
  releaseDate: string;
  author: string;
  genre: string;
  imgSrc: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  releaseDate,
  author,
  genre,
  imgSrc,
}) => {
  return (
    <Card
      hoverable
      style={{ width: "15vw", marginLeft: "5vw", marginBottom: "2vh"}}
      cover={<img alt={name} src={imgSrc} />}
    >
    <Meta title={name} />
    <p><strong>Realize Date: </strong>{releaseDate}</p>
    <p><strong>Publisher </strong>{author}</p>
    <p><strong>Genre </strong>{genre}</p>

    </Card>
  );
};

export default ProductCard;
