import { useState, useRef, useMemo, useEffect } from "react";
import SearchNav from "./SearchNav";
import axios from "axios";

const TableReact = () => {
  const [logs, setLogs] = useState([])
  const [rowsLimit, setRowsLimit] = useState(10);
  const [rowsToShow, setRowsToShow] = useState([]);
  const [customPagination, setCustomPagination] = useState([]);
  const [totalPage, setTotalPage] = useState(
    Math.ceil(logs?.length / rowsLimit)
  );
  
  const [currentPage, setCurrentPage] = useState(0);
  const dropdownRef = useRef(null);
  
  const [columnOptions, setColumnOptions] = useState({
    "level" : "",
    "message": "",
    "commit": "",
    "resource_id": "",
    "trace_id": "",
    "span_id": "",
    "meta_data": ""
  });

  const nextPage = () => {
    const startIndex = rowsLimit * (currentPage + 1);
    const endIndex = startIndex + rowsLimit;
    const newArray = logs.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(currentPage + 1);
  };

  const changePage = (value) => {
    const startIndex = value * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = logs.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(value);
  };

  const previousPage = () => {
    const startIndex = (currentPage - 1) * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = logs.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(0);
    }
  };

  const [ logInterval, setLogInterval ] = useState('Past 30 mins');

  const intervals = {
    "Past 30 mins": {
      "gte": "now-30m/m",
      "lte": "now/m"
    },
    "Past 1 hr": {
      "gte": "now-1h/h",
      "lte": "now/h"
    },
    "⚡Live": {
      "gte": "now-1m/m",
      "lte": "now/m"
    },
    "ALL": {
      "gte": "now-1y/y",
      "lte": "now/y"
    }
  }

  useEffect(() => {

    // Build search query
    const searchQuery = {
      "query": {
        "bool": {
          "must": [
            ...Object.keys(columnOptions)
            .filter((col) => columnOptions[col] !== "")
            .map((col) => (
              {"match": {[col]: columnOptions[col]}}
            ))
          ],
          "filter": [
            {
              "range": {
                "timestamp": intervals[logInterval]
              }
            }
          ]
        }
      },
      "sort": [
        {
          "timestamp": {
            "order": "desc"
          }
        }
      ]
    };

    // Get logs
    const config = {
      method: "get",
      url: "http://localhost:5000/logs",
      params: {
        q: JSON.stringify(searchQuery)
      }
    }

    axios(config)
      .then((response) => {
        console.log(response.data);
        setLogs(response.data);
        setRowsToShow(response.data.slice(0, rowsLimit));
        setCustomPagination(
          Array(Math.ceil(response.data.length / rowsLimit)).fill(null)
        );
      })
      .catch((error) => {
        console.log(error.message);
      });
  } , [
    logInterval,
    columnOptions
  ]);

  return (
    <div className="flex flex-col min-h-screen h-full w-full bg-white items-center ">
      <SearchNav 
        logInterval={logInterval}
        setLogInterval={setLogInterval}
        columnOptions={columnOptions}
        setColumnOptions={setColumnOptions}
      />
      <div className="w-full px-2">
        <div>
          <h1 className="text-2xl font-medium">
            {/* Logs */}
          </h1>
        </div>
        <div className="w-full overflow-x-scroll md:overflow-auto  max-w-8xl 2xl:max-w-none mt-2">
          <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border ">
            <thead className="rounded-lg text-base text-white font-semibold w-full">
              <tr className="bg-[#222E3A]/[6%]">
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap w-3">
                  Level
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Time
                </th>
                <th className="py-3 px-3  justify-center gap-1 text-[#212B36] sm:text-base font-bold whitespace-nowrap w-96">
                  Message
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Commit
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Resource ID
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Trace Id
                </th>
                <th className="flex items-center py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap gap-1">
                  Span Id
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Meta Data 
                </th>
              </tr>
            </thead>
            <tbody>
              {logs?.length === 0 && (
                  <tr className="py-5 px-4 text-base font-normal border-t whitespace-nowrap">
                    <td>
                      No logs found
                    </td>
                  </tr>
              )}

              {rowsToShow?.map((data, index) => (
                <tr
                  className={`max-h-[10px] border-y`}
                  key={index}
                >
                  <td
                    className={`py-1 px-3 font-normal text-base whitespace-nowrap `}
                  >
                    <p className={` px-2 rounded-md justify-center
                      ${data?._source?.level === "error" ? "bg-red-300" : ""}
                      ${data?._source?.level === "info" ? "bg-green-300" : ""}
                      ${data?._source?.level === "warning" ? "bg-yellow-300" : ""}`
                      }>
                      {data?._source?.level}
                    </p>
                  </td>
                  <td
                    className={`py-2 px-3 font-normal text-base whitespace-nowrap`}
                  >
                    {data?._source?.timestamp}
                  </td>
                  <td
                    className={`py-2 px-3 font-normal text-base whitespace-nowrap`}
                  >
                    {data?._source?.message}
                  </td>
                  <td
                    className={`py-2 px-3 text-base  font-normal whitespace-nowrap`}
                  >
                    {data?._source?.commit}
                  </td>
                  <td
                    className={`py-2 px-3 text-base  font-normal min-w-[100px]`}
                  >
                    {data?._source?.resource_id}
                  </td>
                  <td
                    className={`py-2 px-3 text-base  font-normal min-w-[100px]`}
                  >
                    {data?._source?.trace_id}
                  </td>
                  <td
                    className={`py-5 px-4 text-base  font-normal min-w-[100px]`}
                  >
                    {data?._source?.span_id}
                  </td>
                  <td
                    className={`py-5 px-4 text-base  font-normal max-w-[10px] overflow-clip whitespace-nowrap`}
                  >
                    {JSON.stringify(data?._source?.meta_data)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full  flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
          <div className="text-lg">
            Showing {currentPage === 0 ? 1 : currentPage * rowsLimit + 1} to{" "}
            {currentPage === totalPage - 1
              ? logs?.length
              : (currentPage + 1) * rowsLimit}{" "}
            of {logs?.length} entries
          </div>
          <div className="flex">
            <ul
              className="flex justify-center items-center gap-x-[10px] z-30"
              role="navigation"
              aria-label="Pagination"
            >
              <li
                className={` prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled] ${
                  currentPage === 0
                    ? "bg-[#cccccc] pointer-events-none"
                    : " cursor-pointer"
                }
             `}
                onClick={previousPage}
              >
                <img src="https://www.tailwindtap.com/assets/travelagency-admin/leftarrow.svg" />
              </li>
              {customPagination?.map((data, index) => (
                <li
                  className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-[1px] border-solid border-[2px] bg-[#FFFFFF] cursor-pointer ${
                    currentPage === index
                      ? "text-blue-600  border-sky-500"
                      : "border-[#E4E4EB] "
                  }`}
                  onClick={() => changePage(index)}
                  key={index}
                >
                  {index + 1}
                </li>
              ))}
              <li
                className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${
                  currentPage === totalPage - 1
                    ? "bg-[#cccccc] pointer-events-none"
                    : " cursor-pointer"
                }`}
                onClick={nextPage}
              >
                <img src="https://www.tailwindtap.com/assets/travelagency-admin/rightarrow.svg" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TableReact;
