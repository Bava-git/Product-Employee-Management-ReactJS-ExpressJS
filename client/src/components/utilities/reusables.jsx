import { useState, useEffect } from "react";

export const Pagenation = ({
  data,
  ItemPerPage,
  setTableData,
  setCountOfItem,
}) => {
  let CurrentPage = 0;
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    loadPage(data, 0);
    setCountOfItem(data?.length ?? 0);
  }, [data, ItemPerPage]);

  const loadPage = (data, pageno) => {
    if (data?.length === 0) {
      return;
    } else if (data?.length <= 10) {
      setTableData(data);
      return;
    }

    let NoOfPages = Math.ceil(data?.length / ItemPerPage);
    if (NoOfPages <= 0) {
      pageno = 0;
    } else if (pageno >= NoOfPages) {
      pageno = NoOfPages - 1;
    }
    let startIndex = pageno * ItemPerPage;
    let EndIndex = startIndex + ItemPerPage;
    setTableData(data?.slice(startIndex, EndIndex));
    pagenation(data);
  };

  const pagenation = (data) => {
    let NoOfPages = Math.ceil(data?.length / ItemPerPage);
    const allButtons = [
      <a
        data-testid="pagination-previous"
        key="previous"
        className="pagination-item"
        onClick={() => {
          if (CurrentPage === 0) {
            return;
          }
          CurrentPage--;
          loadPage(data, CurrentPage);
        }}
      >
        Previous
      </a>,
      <a
        data-testid={`pagination-page1`}
        key="first"
        className={
          CurrentPage === 0
            ? "pagination-item pagination-active"
            : "pagination-item"
        }
        onClick={() => {
          CurrentPage = 0;
          loadPage(data, CurrentPage);
        }}
      >
        {" "}
        First
      </a>,
    ];
    for (let i = 2; i < NoOfPages; i++) {
      allButtons.push(
        <a
          data-testid={`pagination-page${i}`}
          key={i}
          className={
            CurrentPage === i - 1
              ? "pagination-item pagination-active"
              : "pagination-item"
          }
          onClick={() => {
            CurrentPage = i - 1;
            loadPage(data, i - 1);
          }}
        >
          {i}
        </a>
      );
    }
    allButtons.push(
      <a
        data-testid={`pagination-page${NoOfPages}`}
        key="last"
        className={
          CurrentPage === NoOfPages - 1
            ? "pagination-item pagination-active"
            : "pagination-item"
        }
        onClick={() => {
          CurrentPage = NoOfPages - 1;
          loadPage(data, NoOfPages - 1);
        }}
      >
        Last
      </a>,
      <a
        data-testid="pagination-next"
        key="next"
        className="pagination-item"
        onClick={() => {
          if (CurrentPage === NoOfPages - 1) {
            return;
          }
          CurrentPage++;
          loadPage(data, CurrentPage);
        }}
      >
        Next
      </a>
    );
    setButtons(allButtons);
  };

  return (
    <nav className="pagination" data-testid="pagination-bar">
      {buttons}
    </nav>
  );
};
