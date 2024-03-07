import { useEffect, useMemo, useState } from "react";
import CryptoJS from "crypto-js";
import FilterForm from "./components/FilterForm";
import Pagination from "./components/Pagination";
import ProductList from "./components/ProductList";
import fetchProductId from "./fetchRequests/fetchProductId";
import fetchProductList from "./fetchRequests/fetchProductList";
import "./App.css";

function App() {
  const [productId, setProductId] = useState([]);
  const [productList, setProductList] = useState([]);
  const [fitler, setFilter] = useState({
    action: "get_ids",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(50);
  const [isLoading, setIsLoading] = useState(true);
  const currentData = new Date().toISOString().slice(0, 10).split("-").join("");
  const authorization = useMemo(
    () => CryptoJS.MD5(`Valantis_${currentData}`),
    [currentData]
  );
  const [relevantResponse, setRelevantResponse] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchProductId(authorization, fitler, setProductId);
  }, [fitler, authorization]);

  useEffect(() => {
    try {
      setIsLoading(true);
      fetchProductList(
        authorization,
        productId,
        productPerPage,
        currentPage,
        setProductList,
        relevantResponse,
        setRelevantResponse,
        setIsLoading
      );
    } catch (error) {
      console.log(error);
      setRelevantResponse(!relevantResponse);
    }
  }, [authorization, productId, productPerPage, currentPage, relevantResponse]);

  const paginate = (number) => setCurrentPage(number);
  return (
    <div className="App">
      <FilterForm
        setCurrentPage={setCurrentPage}
        setFilter={setFilter}
        setProductList={setProductList}
        setIsLoading={setIsLoading}
      />
      {isLoading !== false || productList.length === 0 ? (
        <div className="loading"></div>
      ) : (
        <>
          <Pagination
            currentPage={currentPage}
            paginate={paginate}
            productPerPage={productPerPage}
            totalProducts={productId.length}
          />
          <ProductList productList={productList} />
          <Pagination
            currentPage={currentPage}
            paginate={paginate}
            productPerPage={productPerPage}
            totalProducts={productId.length}
          />
        </>
      )}
    </div>
  );
}

export default App;
