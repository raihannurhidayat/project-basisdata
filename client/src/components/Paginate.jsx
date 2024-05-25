import React from "react";
import { paginationApiThred } from "../service/api/Threds";

const Paginate = ({
  page,
  nextPage,
  setNextPage,
  prevPage,
  setPrevPage,
  setPage,
  setThreds
}) => {

  const scrollTop = () => {
    scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };
  
  const handleNextClick = async () => {
    setPage((prev) => prev + 1);
    const response = await paginationApiThred(nextPage);
    setThreds(response.results)
    setPrevPage(response.previous);
    setNextPage(response.next);
    scrollTop()
  };

  const handlePrevClick = async () => {
    setPage((prev) => prev - 1);
    const response = await paginationApiThred(prevPage);
    setPrevPage(response.previous);
    setNextPage(response.next);
    setThreds(response.results)
    scrollTop()
  };

  return (
    <div className="join">
      {prevPage != null && <button className={`join-item btn`} onClick={handlePrevClick}>«</button>}
      <button className="join-item btn">Page {page}</button>
      {nextPage != null && (
        <button className="join-item btn" onClick={handleNextClick}>
          »
        </button>
      )}
    </div>
  );
};

export default Paginate;
