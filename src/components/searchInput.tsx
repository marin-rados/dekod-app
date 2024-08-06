import searchIcon from "../assets/search.svg";

type Props = {
  setSearch: (search: string) => void;
};

const SearchInput = ({ setSearch }: Props) => {
  return (
    <div className="search">
      <img
        className="search__icon"
        height={30}
        src={searchIcon}
        alt="Search Icon"
      />
      <input
        className="search__input"
        type="text"
        placeholder="Search for an employee..."
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchInput;
