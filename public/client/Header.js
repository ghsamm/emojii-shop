const Header = ({ sortByOptions, activeSortByOptionId, onClickOption }) => {
  return (
    <header className="header">
      <div className="header__logo">EMOJii</div>
      <div className="header__options">
        <SortBy
          options={sortByOptions}
          activeOpionId={activeSortByOptionId}
          onClickOption={onClickOption}
        />
      </div>
    </header>
  );
};
