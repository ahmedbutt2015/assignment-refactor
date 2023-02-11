import * as React from "react";
import { FaStar } from "react-icons/fa";
import styles from "./product-list-components.module.css";

interface ProductProps {
  index: number;
  product: {
    title: string;
    description: string;
    price: number;
    isFavorite: boolean;
    rating: { rate: number; count: number };
  };
  onFav: (title: string) => void;
}


export const Product: React.FC<ProductProps> = ({ product, onFav }) => {
  const { productBody, actionBarItem, actionBarItemLabel } = styles;

  return (
    <div className={styles.product} style={{ display: 'inline-block'}}>
      <span className={styles.productTitle} >{product.title}</span>

      <p><strong>Rating: {product.rating ? `${product.rating.rate}/5` : ''}</strong></p>

      <p><b>Price: ${+product.price}</b></p>

      <p className={productBody}>
        <span><b>Description:</b></span>
        <br />
        {product.description}
      </p>

      <div className={styles.actionBar} style={{ display: 'table', width: "100%" }}>
        <span
          className={`${actionBarItem} ${product.isFavorite ? "active" : ""}`}
          role="button"
          onClick={() => {
            onFav(product.title);
          }}
        >
          <FaStar /> 
          <span className={actionBarItemLabel}>
            {product.isFavorite ? "Remove from favorites" : "Add to favorites"}
          </span>
        </span>
      </div>
    </div>
  );
};
