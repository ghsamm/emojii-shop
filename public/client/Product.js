const renderSize = size => {
  return `${size}px`;
};

const renderPrice = price => {
  return `$${price.toFixed(2)}`;
};

const Product = ({ product: { id, size, price, face, date } }) => {
  return (
    <div className="product__container">
      <div className="product__face" style={{ fontSize: size }}>
        {face}
      </div>
      <div className="product__details">
        <div className="product__size">{renderSize(size)}</div>
        <div className="product__price">{renderPrice(price)}</div>
      </div>
    </div>
  );
};
