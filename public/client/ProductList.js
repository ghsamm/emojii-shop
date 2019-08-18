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
      {products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </section>
  );
};
