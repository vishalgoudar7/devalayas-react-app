import React from "react";
import { useDispatch } from "react-redux";
import { setSearch, fetchTemples } from "../redux/templeSlice";

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const query = e.target.value;
    dispatch(setSearch(query));
    dispatch(fetchTemples({ search: query, page: 1 }));
  };

  return (
    <input
      type="text"
      className="form-control mb-3"
      placeholder="Search temples..."
      onChange={handleSearch}
    />
  );
};

export default SearchBar;
