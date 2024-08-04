import { useState, useRef, useMemo, useEffect } from "react";
import SearchNav from "../components/SearchNav";
import axios from "axios";

const TableReact = () => {
  const [logs, setLogs] = useState()
  const [logList, setlogList] = useState([]);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [rowsToShow, setRowsToShow] = useState([]);
  const [customPagination, setCustomPagination] = useState([]);
  const [totalPage, setTotalPage] = useState(
    Math.ceil(logList?.length / rowsLimit)
  );
  
  const [currentPage, setCurrentPage] = useState(0);
  const dropdownRef = useRef(null);

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

  const [ logInterval, setLogInterval ] = useState('⚡Live');

  useEffect(() => {
    // Get logs
    const config = {
      method: "get",
      url: "http://localhost:5000/logs",
    }
    axios(config)
    .then((response) => {
      setLogs(response.data);
      setlogList(response.data);
      setRowsToShow(response.data.slice(0, rowsLimit));
      setCustomPagination(
        Array(Math.ceil(response.data.length / rowsLimit)).fill(null)
      );
    })
    .catch((error) => {
      console.log(error);
    });
  } , []);

  return (
    <div className="flex flex-col min-h-screen h-full w-full bg-white items-center ">
      <SearchNav 
        logInterval={logInterval}
        setLogInterval={setLogInterval}
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
                <th className="flex items-center py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap gap-1">
                  Span Id
                </th>
              </tr>
            </thead>
            <tbody>
              {logList?.length === 0 && (
                  <tr className="py-5 px-4 text-base font-normal border-t whitespace-nowrap">
                    No logs found
                  </tr>
              )}

              {rowsToShow?.map((data, index) => (
                <tr
                  className={`h-1`}
                  key={index}
                >
                  <td
                    className={`py-2 px-3 font-normal text-base ${
                      index === 0
                        ? "border-t-2 border-black"
                        : index === rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    } whitespace-nowrap`}
                  >
                    {data?._source?.level}
                  </td>
                  <td
                    className={`py-2 px-3 font-normal text-base ${
                      index === 0
                        ? "border-t-2 border-black"
                        : index === rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    } whitespace-nowrap`}
                  >
                    {data?._source?.timestamp}
                  </td>
                  <td
                    className={`py-2 px-3 font-normal text-base ${
                      index === 0
                        ? "border-t-2 border-black"
                        : index === rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    } whitespace-nowrap`}
                  >
                    {data?._source?.message}
                  </td>
                  <td
                    className={`py-2 px-3 text-base  font-normal ${
                      index === 0
                        ? "border-t-2 border-black"
                        : index === rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    } whitespace-nowrap`}
                  >
                    {data?._source?.commit}
                  </td>
                  <td
                    className={`py-2 px-3 text-base  font-normal ${
                      index === 0
                        ? "border-t-2 border-black"
                        : index === rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    } min-w-[250px]`}
                  >
                    {data?._source?.resource_id}
                  </td>
                  <td
                    className={`py-5 px-4 text-base  font-normal ${
                      index === 0
                        ? "border-t-2 border-black"
                        : index === rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    }`}
                  >
                    {data?._source?.span_id}
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
              ? logList?.length
              : (currentPage + 1) * rowsLimit}{" "}
            of {logList?.length} entries
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
