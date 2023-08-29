// src/ProductCard.tsx
import React from 'react';
import { Card, Row, Col } from 'antd';

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
<Row gutter={[16, 16]}>
  <Col xs={24} sm={18} md={18} lg={16} xl={16}>
    <Card
      hoverable
      style={{ marginBottom: "2vh" }}
      cover={<img alt={name} src={imgSrc} />}
    >
      <Meta title={name} />
      <p><strong>Release Date: </strong>{releaseDate}</p>
      <p><strong>Publisher: </strong>{author}</p>
      <p><strong>Genre: </strong>{genre}</p>
    </Card>
  </Col>
  {/* Repeat the Col and Card components for other cards */}
</Row>
  );
};

export default ProductCard;
