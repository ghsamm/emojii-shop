const sortByOptions = { 0: "", 1: "id", 2: "price", 3: "size" };

const App = () => {
  const [activeSortByOptionId, setActiveSortByOptionId] = useState(0);
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const sortByOption = sortByOptions[activeSortByOptionId];

  const changeSortByOptionAndResetPageNumber = sortByOptionId => {
    setActiveSortByOptionId(sortByOptionId);
    setPageNumber(1);
  };
  const concatProducts = newProducts => {
    setProducts(products.concat(newProducts));
  };
  const fetchProducts = () => {
    setIsLoading(true);
    fetch(
      `http://localhost:3000/api/products?_page=${pageNumber}${sortByOption &&
        "&_sort=" + sortByOption}`
    )
      .then(res => res.json())
      .then(newProducts => {
        setIsLoading(false);
        if (pageNumber === 1) {
          setProducts(newProducts);
        } else {
          concatProducts(newProducts);
        }
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [pageNumber, activeSortByOptionId]);

  return (
    <div className="app-container">
      <Header
        sortByOptions={sortByOptions}
        activeSortByOptionId={activeSortByOptionId}
        onClickOption={changeSortByOptionAndResetPageNumber}
      />
      <ProductList products={products} />
      {isLoading && <Loading />}
      <input
        type="button"
        value="more"
        onClick={() => {
          setPageNumber(pageNumber + 1);
        }}
      />
    </div>
  );
};
