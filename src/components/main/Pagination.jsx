import React from "react";
// need rework
const Pagination = ({ listSer, pageEx, setPageEx, handleTypeAndItems }) => {
  const prevPage = () => {
    if (pageEx > 1) {
      let value = pageEx;
      value = value - 1;
      setPageEx(value);
      handleTypeAndItems(value);
    } else {
      setPageEx(1);
    }
  };

  const nextPage = () => {
    let value = pageEx;
    value = value + 1;
    setPageEx(value);
    handleTypeAndItems(value);
  };

  const handlePage = (value) => {
    setPageEx(Number(value));
    listPage.length = 0;
  };

  const screenWidth = window.screen.width;
  console.log(screenWidth);

  const listPageforMobile = [];
  const listPage = [];

  for (let i = 1; i < pageEx + 10; i++) {
    if (listPage.length >= 10) {
    } else {
      listPage.push(pageEx + i);
    }
    if (listPage.length >= 6) {
    } else {
      listPageforMobile.push(pageEx + i);
    }
  }

  return (
    <div className="flex justify-center">
      {!listSer.results && (
        <div className="btn-group">
          <button onClick={() => prevPage()} className="btn">
            «
          </button>
          {screenWidth < 460 &&
            listPageforMobile.map((page, index) => (
              <button
                key={index}
                onClick={() => handlePage(page)}
                className={`btn btn-md ${page === pageEx ? "btn-active" : ""}`}
              >
                {page}
              </button>
            ))}
          {screenWidth > 460 &&
            listPage.map((page, index) => (
              <button
                key={index}
                onClick={() => handlePage(page)}
                className={`btn btn-md ${page === pageEx ? "btn-active" : ""}`}
              >
                {page}
              </button>
            ))}
          <input
            type="text"
            placeholder="..."
            onChange={(e) =>
              e.target.value ? handlePage(e.target.value) : handlePage(pageEx)
            }
            // className="text-white w-12 bg-slate-900 text-center "
            className="input w-12"
          />
          {/* <button onClick={() => handlePage(500)}>{500}</button> */}
          <button onClick={() => nextPage()} className="btn">
            »
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
