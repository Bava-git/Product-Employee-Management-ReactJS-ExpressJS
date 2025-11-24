import { useState, useEffect } from "react";

export function useSessionStorage(key, defaultValue) {
    const [value, setValue] = useState(() => {
        const saved = sessionStorage.getItem(key);
        return saved ? JSON.parse(saved) : defaultValue;
    });

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    const reset = () => {
        setValue(defaultValue);
        sessionStorage.setItem(key, JSON.stringify(defaultValue));
    };

    return [value, setValue, reset];
};

export const Pagenation = ({ data, ItemPerPage, setTableData, setCountOfItem }) => {

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
            pageno = 0
        } else if (pageno >= NoOfPages) {
            pageno = NoOfPages - 1;
        }
        let startIndex = pageno * ItemPerPage;
        let EndIndex = startIndex + ItemPerPage;
        setTableData(data?.slice(startIndex, EndIndex));
        pagenation(data)
    };

    const pagenation = (data) => {
        let NoOfPages = Math.ceil(data?.length / ItemPerPage);
        const allButtons = [
            <a key="previous" className='pagination-item' onClick={() => {
                if (CurrentPage === 0) {
                    return;
                }
                CurrentPage--;
                loadPage(data, CurrentPage);
            }}>Previous</a>,
            <a key="first" className={CurrentPage === 0 ? "pagination-item pagination-active" : "pagination-item"} onClick={() => {
                CurrentPage = 0;
                loadPage(data, CurrentPage);
            }
            }> First</a>,
        ];
        for (let i = 2; i < NoOfPages; i++) {
            allButtons.push(
                <a key={i} className={CurrentPage === (i - 1) ? "pagination-item pagination-active" : "pagination-item"} onClick={() => {
                    CurrentPage = (i - 1);
                    loadPage(data, (i - 1));
                }}>{i}</a>);
        }
        allButtons.push(
            <a key="last" className={CurrentPage === (NoOfPages - 1) ? "pagination-item pagination-active" : "pagination-item"} onClick={() => {
                CurrentPage = NoOfPages - 1
                loadPage(data, (NoOfPages - 1));
            }}>Last</a>,
            <a key="next" className='pagination-item' onClick={() => {
                if (CurrentPage === (NoOfPages - 1)) {
                    return;
                }
                CurrentPage++;
                loadPage(data, CurrentPage);
            }}>Next</a>,
        );
        setButtons(allButtons);
    };

    return (
        <nav className="pagination">
            {buttons}
        </nav>
    )

};