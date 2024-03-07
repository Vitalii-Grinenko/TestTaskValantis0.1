import Product from "./Product";
import styles from "./ProductList.module.css";
function ProductList({ productList }) {
  return (
    <div className={styles.productListContainer}>
      {productList.map((item, id) => {
        return <Product key={id} item={item} />;
      })}
    </div>
  );
}

export default ProductList;
