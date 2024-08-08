import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { EmployeeType } from "../types/global";
import { useSearchStore } from "../store/store";

import SearchInput from "../components/searchInput";

import personImg from "../assets/person.svg";
import plusIcon from "../assets/plus.svg";

import { formatDate, getData } from "../utils/employeeUtils";
import { useEmployeeFilters } from "../hooks/useEmployeeFilters";

const HomePage = () => {
  //STATES
  const [data, setData] = useState<EmployeeType[]>([]);
  const { setSearch, search } = useSearchStore();
  const [selectedPosition, setSelectedPosition] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortKey, setSortKey] = useState<"id" | "firstName" | "lastName">("id");
  const [pageSize, setPageSize] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    getData(setData);
  }, []);

  const handleSortChange = (key: "id" | "firstName" | "lastName") => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const uniqueJobTitles = Array.from(
    new Set(data.map((employee) => employee.jobTitle))
  );
  const filteredAndSortedEmployees = useEmployeeFilters(
    data,
    selectedPosition,
    sortKey,
    sortOrder,
    search
  );
  const paginatedEmployees = filteredAndSortedEmployees.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(filteredAndSortedEmployees.length / pageSize);

  return (
    <div className="home">
      <div className="intro">
        <h1 className="intro__title">Employees</h1>
        <button
          onClick={() => navigate("/employee/new")}
          className="intro__btn"
        >
          <img height={25} src={plusIcon} alt="Add Icon" /> Add New Employee
        </button>
      </div>

      <div className="filtering">
        <SearchInput setSearch={setSearch} />
        <label htmlFor="job-position">Filter by Job Position:</label>
        <select
          id="job-position"
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value)}
        >
          <option>All</option>
          {uniqueJobTitles.map((jobTitle, index) => (
            <option key={index} value={jobTitle}>
              {jobTitle}
            </option>
          ))}
        </select>
        <label htmlFor="page-size">Items per page:</label>
        <select
          id="page-size"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 15, 20].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <table className="employees">
        <thead className="employees__header">
          <tr className="employees__header__tags">
            <th className="employees__header__tags__tag">#</th>
            <th className="employees__header__tags__tag">Photo</th>
            <th className="employees__header__tags__tag">
              <button onClick={() => handleSortChange("firstName")}>
                First Name{" "}
                {sortKey === "firstName" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
            </th>
            <th className="employees__header__tags__tag">
              <button onClick={() => handleSortChange("lastName")}>
                Last Name{" "}
                {sortKey === "lastName" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
            </th>
            <th className="employees__header__tags__tag">Date of Birth</th>
            <th className="employees__header__tags__tag">Job Title</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEmployees.map((employee) => (
            <tr
              key={employee.id}
              onClick={() =>
                navigate(`/employee/${employee.id}/edit`, {
                  state: { employee },
                })
              }
              className="employee"
            >
              <td className="employee__info">{employee.id}</td>
              <td className="employee__info">
                <img
                  className="employee__img"
                  src={personImg}
                  height={50}
                  width={50}
                  alt="Employee"
                />
              </td>
              <td className="employee__info">{employee.firstName}</td>
              <td className="employee__info">{employee.lastName}</td>
              <td className="employee__info">
                {formatDate(employee.dateOfBirth)}
              </td>
              <td className="employee__info">{employee.jobTitle}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`pagination__button ${
              currentPage === page ? "active" : ""
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
