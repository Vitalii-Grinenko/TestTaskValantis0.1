import { useState } from "react";
import styles from "./FilterForm.module.css";

function FilterForm({ setFilter, setIsLoading, setCurrentPage }) {
  const [filterOptions, setFilterOptions] = useState({
    price: "",
    brand: "",
    product: "",
  });
  const onSubmitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setCurrentPage(1);
    if (
      filterOptions.price.length === 0 &&
      filterOptions.brand.length === 0 &&
      filterOptions.product.length === 0
    ) {
      setFilter({ action: "get_ids" });
    } else {
      let res = { action: "filter", params: {} };
      if (filterOptions.price.length !== 0)
        res.params.price = Number(filterOptions.price);
      if (filterOptions.brand.length !== 0)
        res.params.brand = filterOptions.brand;
      if (filterOptions.product.length !== 0)
        res.params.product = filterOptions.product;
      setFilter(res);
    }
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <div className={styles.filterFormContainer}>
        <div className={styles.inputContainer}>
          <input
            className={styles.inputFilter}
            placeholder="Price filter"
            value={filterOptions.price}
            onChange={(e) =>
              setFilterOptions({ ...filterOptions, price: e.target.value })
            }
          />
          <input
            className={styles.inputFilter}
            placeholder="Brand filter"
            value={filterOptions.brand}
            onChange={(e) =>
              setFilterOptions({ ...filterOptions, brand: e.target.value })
            }
          />
          <input
            className={styles.inputFilter}
            placeholder="Product filter"
            value={filterOptions.product}
            onChange={(e) =>
              setFilterOptions({ ...filterOptions, product: e.target.value })
            }
          />
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.buttonFliter} type="submit" title="Submit">
            Подтвердить
          </button>
          <button
            className={styles.buttonFliter}
            onClick={() => {
              setFilterOptions({ price: "", brand: "", product: "" });
              setCurrentPage(1);
            }}
            title="Default"
          >
            Сбросить
          </button>
        </div>
      </div>
    </form>
  );
}

export default FilterForm;
