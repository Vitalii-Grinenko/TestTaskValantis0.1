const fetchProductId = async (authorization, fitler, setProductId) => {
  const data = await fetch("https://api.valantis.store:41000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": authorization,
    },
    body: JSON.stringify(fitler),
  });
  const jsonData = await data.json();
  setProductId(Array.from(new Set(jsonData.result)));
};

export default fetchProductId;
