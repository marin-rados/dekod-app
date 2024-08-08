import { useEffect, useState } from "react";
import { EmployeeType } from "../types/global";
import personImg from "../assets/person.svg";
import { useSearchStore } from "../store/store";
import SearchInput from "../components/searchInput";
import plusIcon from "../assets/plus.svg";
import { useNavigate } from "react-router";

const HomePage = () => {
  //STATES
  const [data, setData] = useState<EmployeeType[]>([]);
  const { setSearch, search } = useSearchStore();
  const [selectedPosition, setSelectedPosition] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortKey, setSortKey] = useState<"id" | "firstName" | "lastName">("id"); // Added "id" as default sort key
  const [pageSize, setPageSize] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();

  //fetch the data
  const getData = () => {
    fetch("/api")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        console.log(res);
      })
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  //format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // FILTERING/SORTING LOGIC

  //create array with unique job titles
  const uniqueJobTitles = Array.from(
    new Set(data.map((employee) => employee.jobTitle))
  );

  //initialy display all jobs, on job position select display only the employees with the selected job
  const filteredEmployees =
    selectedPosition === "All"
      ? data
      : data.filter((employee) => employee.jobTitle === selectedPosition);

  //sort employees by first and last name
  const sortedEmployees = filteredEmployees.sort((a, b) => {
    if (a[sortKey] < b[sortKey]) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (a[sortKey] > b[sortKey]) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handlePositionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPosition(event.target.value);
  };

  const handleSortChange = (key: "id" | "firstName" | "lastName") => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1); //reset to first page whenever page size changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  //pagination Logic
  const paginatedEmployees = sortedEmployees.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(sortedEmployees.length / pageSize);

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
          onChange={handlePositionChange}
        >
          <option>All</option>
          {uniqueJobTitles.map((jobTitle, index) => (
            <option key={index} value={jobTitle}>
              {jobTitle}
            </option>
          ))}
        </select>
        <label htmlFor="page-size">Items per page:</label>
        <select id="page-size" value={pageSize} onChange={handlePageSizeChange}>
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
          {paginatedEmployees
            .filter((item: EmployeeType) => {
              const keys = [
                "firstName",
                "lastName",
                "jobTitle",
              ] as (keyof EmployeeType)[];
              return search === ""
                ? true
                : keys.some((key) =>
                    (item[key] as string)
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  );
            })
            .map((employee: EmployeeType) => (
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
                    alt="Image of an employee"
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
            onClick={() => handlePageChange(page)}
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
