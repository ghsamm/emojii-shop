const ProductList = ({ products, onFetchMore }) => {
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
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
          showAd={i !== 0 && i % 20 === 0}
        />
      ))}
    </section>
  );
};
