const createRandomizedAdNumbers = count => {
  const indexes = Array.from({ length: count }, (_, i) => i);
  const randomFactors = Array.from({ length: count }, () => Math.random());

  return indexes.sort((a, b) => randomFactors[a] - randomFactors[b]);
};

const ProductList = React.memo(({ products, onFetchMore }) => {
  const [randomizedAdNumbers, setRandomizedAdNumbers] = useState([]);
  const [mapAdNumbersToIndexes, setMapAdNumbersToIndexes] = useState({});
  const [nextAdNumber, setNextAdNumber] = useState(-1);

  const incrementNextAdNumber = () => {
    const index = mapAdNumbersToIndexes[nextAdNumber];
    const nextIndex = (index + 1) % randomizedAdNumbers.length;
    setNextAdNumber(randomizedAdNumbers[nextIndex]);
  };

  const initializeRandomAdNumbers = () => {
    const randomizedAdNumbersFromLocalStorage = (() => {
      try {
        return JSON.parse(
          window.localStorage.getItem("randomizedAdNumbers") || "[]"
        );
      } catch (err) {
        // in case parsing local storage failed
        return [];
      }
    })();

    const newRandomizedAdNumbers =
      randomizedAdNumbersFromLocalStorage.length !== 0
        ? randomizedAdNumbersFromLocalStorage
        : createRandomizedAdNumbers(1000);

    const nextAdNumberFromLocalStorage = (() => {
      try {
        return JSON.parse(window.localStorage.getItem("nextAdNumber") || "-1");
      } catch (err) {
        // in case parsing local storage failed
        return -1;
      }
    })();

    const newNextAdNumber =
      nextAdNumberFromLocalStorage !== -1
        ? nextAdNumberFromLocalStorage
        : newRandomizedAdNumbers[0];

    setNextAdNumber(newNextAdNumber);

    setRandomizedAdNumbers(newRandomizedAdNumbers);

    const createMapAdNumbersToIndexes = adNumbers => {
      const map = {};
      Object.entries(adNumbers).forEach(([adIndex, adNumber]) => {
        map[adNumber] = Number(adIndex);
      });
      return map;
    };
    setMapAdNumbersToIndexes(
      createMapAdNumbersToIndexes(newRandomizedAdNumbers)
    );
  };

  useEffect(initializeRandomAdNumbers, []);

  const saveRandomizedAdNumbers = () => {
    window.localStorage.setItem(
      "randomizedAdNumbers",
      JSON.stringify(randomizedAdNumbers)
    );
  };

  useEffect(saveRandomizedAdNumbers, [randomizedAdNumbers]);

  const saveNextAdNumberToLocalStorage = () => {
    window.localStorage.setItem("nextAdNumber", JSON.stringify(nextAdNumber));
  };

  useEffect(saveNextAdNumberToLocalStorage, [nextAdNumber]);

  const handleScroll = () => {
    if (
      Math.abs(
        window.innerHeight +
          document.documentElement.scrollTop -
          document.documentElement.offsetHeight
      ) > 1
    ) {
      return;
    }
    onFetchMore();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <section className="product-list">
      {products.map((product, i) => (
        <Product
          key={product.id}
          product={product}
          shouldShowAd={i !== 0 && i % 20 == 0}
          onRequestAdNumber={() => {
            const adNumber = nextAdNumber;
            incrementNextAdNumber();
            return adNumber;
          }}
        />
      ))}
    </section>
  );
});
