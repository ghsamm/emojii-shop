const Loading = ({ isLoading }) => {
  return (
    <div
      className="loading"
      style={{ visibility: isLoading ? "visible" : "hidden" }}
    >
      Loading...
    </div>
  );
};
