const SortBy = ({ options, activeOpionId, onClickOption }) => {
  const [areOpionsVisible, setAreOptionsVisible] = useState(false);
  const hideOptions = () => {
    setAreOptionsVisible(false);
  };
  const toggleOptions = () => {
    setAreOptionsVisible(areOpionsVisible => !areOpionsVisible);
  };
  return (
    <div className="sort-by">
      <input
        type="button"
        className="sort-by__button"
        style={{
          backgroundColor: areOpionsVisible
            ? "rgba(0, 0, 0, 0.05)"
            : "transparent"
        }}
        value={`sort by ${options[activeOpionId] || ""}▾`}
        onClick={toggleOptions}
      />
      {areOpionsVisible && (
        <div className="sort-by__options">
          {Object.entries(options).map(([id, value]) => (
            <input
              key={id}
              type="button"
              className="sort-by__button"
              value={value}
              onClick={() => {
                onClickOption(id);
                hideOptions();
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
