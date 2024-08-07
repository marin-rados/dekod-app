import { useEffect, useState } from "react";
import { EmployeeType } from "../types/global";
import personImg from "../assets/person.svg";
import { useSearchStore } from "../store/store";
import SearchInput from "../components/searchInput";
import plusIcon from "../assets/plus.svg";
import { useNavigate } from "react-router";

const HomePage = () => {
  const [data, setData] = useState<EmployeeType[]>([]);
  const { setSearch, search } = useSearchStore();
  const [selectedPosition, setSelectedPosition] = useState<string>("All");
  const navigate = useNavigate();

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  //FILTERING LOGIC

  //make an array that has unique job positions
  const uniqueJobTitles = Array.from(
    new Set(data.map((employee) => employee.jobTitle))
  );

  //display appropriate data based on selected position
  const filteredEmployees =
    selectedPosition === "All"
      ? data
      : data.filter((employee) => employee.jobTitle === selectedPosition);

  const handlePositionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPosition(event.target.value);
  };

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
      <div className="container">
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
        </div>
        <table className="employees">
          <thead className="employees__header">
            <tr className="employees__header__tags">
              <th className="employees__header__tags__tag">#</th>
              <th className="employees__header__tags__tag">Photo</th>
              <th className="employees__header__tags__tag">First Name</th>
              <th className="employees__header__tags__tag">Last Name</th>
              <th className="employees__header__tags__tag">Date of Birth</th>
              <th className="employees__header__tags__tag">Job Title</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees
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
                      height={100}
                      width={100}
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
      </div>
    </div>
  );
};

export default HomePage;
