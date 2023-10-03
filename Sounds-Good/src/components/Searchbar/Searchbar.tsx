import "./Searchbar.css";

type SearchbarProps = {
  searchbarName: string;
  isRequired: boolean;
  labelValue: string;
  placeholder: string;
  ariaLabel: string;
};
export function Searchbar({
  searchbarName,
  isRequired,
  labelValue,
  placeholder,
  ariaLabel,
}: SearchbarProps) {
  return (
    <div className="searchbar-container">
      <form
        className="searchbar-form"
        method="get"
        action="/project2/searchResult">
        <label className="searchbar-label" htmlFor={searchbarName}>
          {labelValue}
        </label>
        <input
          type="search"
          className="searchbar"
          name={searchbarName}
          required={isRequired}
          placeholder={placeholder}
          aria-aria-label={ariaLabel}
        />
      </form>
    </div>
  );
}
export default Searchbar;
