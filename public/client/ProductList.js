const ProductList = ({ products }) => {
  return (
    <section className="product-list">
      {products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </section>
  );
};
