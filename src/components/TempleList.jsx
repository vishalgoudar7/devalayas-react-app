import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemples, setPage } from "../redux/templeSlice";
import TempleCard from "./TempleCard";
import SearchBar from "./SearchBar";

const TempleList = () => {
  const dispatch = useDispatch();
  const { temples, page, search, loading } = useSelector((state) => state.temple);

  useEffect(() => {
    dispatch(fetchTemples({ page, search }));
  }, [dispatch, page, search]);

  return (
    <div className="container mt-4">
      <SearchBar />
      <div className="row g-3">
        {loading ? (
          <p>Loading...</p>
        ) : temples.length === 0 ? (
          <p className="text-danger">No temples found.</p>
        ) : (
          temples.map((temple) => (
            <TempleCard key={temple.id} temple={temple} />
          ))
        )}
      </div>

      <div className="d-flex justify-content-center mt-4 gap-2">
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => dispatch(setPage(Math.max(1, page - 1)))}
        >
          Previous
        </button>
        <span className="fw-bold align-self-center">Page {page}</span>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => dispatch(setPage(page + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TempleList;
