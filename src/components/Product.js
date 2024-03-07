import styles from "./Product.module.css";

function Product({ item }) {
  return (
    <div className={styles.productBlock}>
      <h3>{item.product}</h3>
      <h3>Цена: {item.price}</h3>
      <h3>Бренд: {item.brand === null ? "Неизвестен" : item.brand}</h3>
      <p>Id: {item.id}</p>
    </div>
  );
}

export default Product;
