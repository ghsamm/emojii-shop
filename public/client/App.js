const API_URL = "http://localhost:3000/api";
const sortByOptions = { 0: "", 1: "id", 2: "price", 3: "size" };

const App = () => {
  const [activeSortByOptionId, setActiveSortByOptionId] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);

  const sortByOption = sortByOptions[activeSortByOptionId];

  const incrementPageNumber = () => {
    setPageNumber(pageNumber => pageNumber + 1);
  };

  const changeSortByOptionAndResetPageNumber = sortByOptionId => {
    setActiveSortByOptionId(sortByOptionId);
    setPageNumber(1);
  };
  const emptyProducts = () => {
    setProductsPerPage({});
  };
  const getProductsPerPage = pageNumber => {
    return productsPerPage[pageNumber] || [];
  };
  const getAllProducts = () => {
    return Array.from({ length: pageNumber }, (_, i) => i + 1)
      .map(getProductsPerPage)
      .reduce((res, pageProducts) => {
        //
        // if you are wondering why I am using push instead of concat
        // read this: https://www.richsnapp.com/blog/2019/06-09-reduce-spread-anti-pattern

        res.push(...pageProducts);
        return res;
      }, []);
  };
  const addProductsPage = (pageNumber, products) => {
    setProductsPerPage(productsPerPage => ({
      ...productsPerPage,
      [pageNumber]: products
    }));
  };
  const fetchProductsPerPage = pageNumber => {
    return fetch(
      `${API_URL}/products?_page=${pageNumber}${sortByOption &&
        "&_sort=" + sortByOption}`
    ).then(res => res.json());
  };

  useEffect(() => {
    setIsLoading(true);
    if (pageNumber === 1) {
      emptyProducts();
      fetchProductsPerPage(pageNumber).then(newProducts => {
        setIsLoading(false);
        addProductsPage(pageNumber, newProducts);
      });
    }
    fetchProductsPerPage(pageNumber + 1).then(newProducts => {
      setIsLoading(false);
      if (newProducts.length === 0) {
        setIsEndReached(true);
      }
      addProductsPage(pageNumber + 1, newProducts);
    });
  }, [pageNumber, activeSortByOptionId]);

  return (
    <div className="app-container">
      <Header
        sortByOptions={sortByOptions}
        activeSortByOptionId={activeSortByOptionId}
        onClickOption={changeSortByOptionAndResetPageNumber}
      />
      <ProductList
        products={getAllProducts()}
        onFetchMore={() => {
          if (isLoading || isEndReached) {
            return;
          }
          incrementPageNumber();
        }}
      />
      <Loading isLoading={isLoading} />
      {isEndReached && <EndOfCatalogue />}
    </div>
  );
};
