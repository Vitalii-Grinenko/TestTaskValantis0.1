const fetchProductList = async (
  authorization,
  productId,
  productPerPage,
  currentPage,
  setProductList,
  relevantResponse,
  setRelevantResponse,
  setIsLoading
) => {
  const data = await fetch("https://api.valantis.store:41000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": authorization,
    },
    body: JSON.stringify({
      action: "get_items",
      params: {
        ids: productId.slice(
          productPerPage * currentPage - productPerPage,
          productPerPage * currentPage
        ),
      },
    }),
  });
  const table = {};
  const jsonData = await data.json();
  const result = await jsonData.result.filter(
    ({ id }) => !table[id] && (table[id] = 1)
  );

  setProductList(result);

  if (productId.length > 0 && result.length === 0) {
    setRelevantResponse(!relevantResponse);
  }
  setIsLoading(false);
};

export default fetchProductList;
