const renderSize = size => {
  return `${size}px`;
};

const renderPrice = price => {
  return `$${price.toFixed(2)}`;
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const renderHumanizedDate = dateAsString => {
  const date = new Date(new Date(dateAsString).setHours(0, 0, 0, 0));
  const timestamp = Number(date);
  const today = new Date();
  const todayTimestamp = today.setHours(0, 0, 0, 0);
  const durationInMs = todayTimestamp - timestamp;
  const durationInDays = durationInMs / 1000 / 60 / 60 / 24;
  if (durationInDays === 0) {
    return "added today";
  }
  if (durationInDays === 1) {
    return "added yesterday";
  }
  if (durationInDays <= 7) {
    return `added ${durationInDays} days ago`;
  }

  const dayOfMonth = date.getDate();
  const monthAsNumber = date.getMonth();
  const month = months[monthAsNumber];
  const year = date.getFullYear();
  const thisYear = today.getFullYear();
  if (year === thisYear) {
    return `added on ${dayOfMonth} ${month}`;
  }
  return `added on ${dayOfMonth} ${month} ${year}`;
};

const renderFullDate = dateAsString => {
  const date = new Date(dateAsString);
  const dayOfMonth = date.getDate();
  const monthAsNumber = date.getMonth();
  const month = months[monthAsNumber];
  const year = date.getFullYear();

  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${dayOfMonth}-${month}-${year} at ${hour}:${minute}`;
};

const Product = React.memo(
  ({
    shouldShowAd,
    requestAdNumber,
    product: { id, size, price, face, date }
  }) => {
    const [adNumber, setAdNumber] = useState(-1);
    useEffect(() => {
      if (!shouldShowAd) {
        return;
      }
      setAdNumber(requestAdNumber());
    }, []);
    return (
      <Fragment>
        {shouldShowAd && adNumber > -1 && (
          <div className="product__container">
            <div
              className="ad"
              style={{
                backgroundImage: `url(/ads/?r=${adNumber})`
              }}
            />
          </div>
        )}
        <div className="product__container">
          <div className="product__face" style={{ fontSize: size }}>
            {face}
          </div>
          <div className="product__details">
            <div className="product__details-row">
              <div className="product__size">{renderSize(size)}</div>
              <div className="product__price">{renderPrice(price)}</div>
            </div>
            <div className="product__details-row">
              <div className="product__date" title={renderFullDate(date)}>
                {renderHumanizedDate(date)}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
);
