const sortByOptions = { 0: "", 1: "id", 2: "price", 3: "size" };

const App = () => {
  const [activeSortByOptionId, setActiveSortByOptionId] = useState(0);
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const sortByOption = sortByOptions[activeSortByOptionId];
  const fetchProducts = () => {
    fetch(
      `http://localhost:3000/api/products?_page=${pageNumber}${sortByOption &&
        "&_sort=" + sortByOption}`
    )
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, [pageNumber, sortByOption]);

  return (
    <div className="app-container">
      <Header
        sortByOptions={sortByOptions}
        activeSortByOptionId={activeSortByOptionId}
        onClickOption={setActiveSortByOptionId}
      />
      <ProductList products={products} />
    </div>
  );
};
