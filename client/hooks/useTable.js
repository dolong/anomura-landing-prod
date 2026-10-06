import { useState, useEffect } from "react";

const calculateRange = (data, itemsPerPage) => {
    const range = [];
    const num = Math.ceil(data.length / itemsPerPage);
    let i = 1;
    for (let i = 1; i <= num; i++) {
        range.push(i);
    }
    return range;
};

const sliceData = (data, page, itemsPerPage) => {
    return data.slice((page - 1) * itemsPerPage, page * itemsPerPage);
};


/** This is for table with all data query all at once */
const useTable = (data, page, itemsPerPage) => {
    const [tableRange, setTableRange] = useState([]);
    const [slice, setSlice] = useState([]);

    useEffect(() => {
        const range = calculateRange(data, itemsPerPage);
        setTableRange([...range]);

        const slice = sliceData(data, page, itemsPerPage);
        setSlice([...slice]);
    }, [data, setTableRange, page, setSlice, itemsPerPage]);

    return { slice, range: tableRange };
};

export default useTable;