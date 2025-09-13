import { useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { useSearch } from "../../hooks/useSearch";
import { filterProducts } from "../../redux/actions/filterActions";
import { useAppDispatch } from "../../hooks/hooks";

const SearchBar: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const { filter, isLoading } = useSearch();
  const dispatch = useAppDispatch();
  const searchbarRef = useRef<HTMLDivElement>(null);
  //   const dispatch = useAppDispatch();
  const isMobile = window.screen.width <= 800;
  const navigate = useNavigate();

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value.trimStart());
  };

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
      searchbarRef.current?.classList.remove("is-open-recent-search");

      if (isMobile) navigate("/");
      dispatch(filterProducts({ kw: searchInput }));

      // setSearchInput("");
    }
  };

  //   const recentSearchClickHandler = (e: globalThis.MouseEvent) => {
  //     const searchBar = (e.target as HTMLElement).closest(".searchbar");
  //     if (!searchBar) {
  //       searchbarRef.current?.classList.remove("is-open-recent-search");
  //       document.removeEventListener("click", recentSearchClickHandler);
  //     }
  //   };

  //   const onFocusInput = () => {
  //     if (filter.recent.length !== 0) {
  //       searchbarRef.current?.classList.add("is-open-recent-search");
  //       document.addEventListener("click", recentSearchClickHandler);
  //     }
  //   };

  // const onClickRecentSearch = (keyword: string) => {
  //   searchbarRef.current?.classList.remove("is-open-recent-search");
  //   const search = { ...filter, kw: searchInput };
  //   dispatch(filterProducts(search));
  // };

  //   const onClearRecent = () => {
  //     dispatch(clearRecentSearch());
  //   };

  return (
    <div className="searchbar" ref={searchbarRef}>
      <SearchOutlined className="searchbar-icon" />
      <input
        className="search-input searchbar-input"
        onChange={onSearchChange}
        onKeyUp={onKeyUp}
        // onFocus={onFocusInput}
        placeholder="Search post..."
        readOnly={isLoading}
        type="text"
        value={searchInput}
      />
      {/* {filter.recent.length !== 0 && (
        <div className="searchbar-recent">
          <div className="searchbar-recent-header">
            <h5>Recent Search</h5>
            <h5
              className="searchbar-recent-clear text-subtle"
              onClick={onClearRecent}
              role="presentation"
            >
              Clear
            </h5>
          </div>
          {filter.recent.map((item: string, index: number) => (
            <div
              className="searchbar-recent-wrapper"
              key={`search-${item}-${index}`}
            >
              <h5
                className="searchbar-recent-keyword margin-0"
                onClick={() => onClickRecentSearch(item)}
                role="presentation"
              >
                {item}
              </h5>
              <span
                className="searchbar-recent-button text-subtle"
                onClick={() => dispatch(removeSelectedRecent(item))}
                role="presentation"
              >
                X
              </span>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default SearchBar;
