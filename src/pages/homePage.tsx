import { useEffect, useState } from "react";
import { EmployeeType } from "../types/global";
import personImg from "../assets/person.png";
import { useSearchStore } from "../store/store";
import SearchInput from "../components/searchInput";

const HomePage = () => {
  const [data, setData] = useState<EmployeeType[]>([]);
  const { setSearch, search } = useSearchStore();

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

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <>
      <div className="home">
        <SearchInput setSearch={setSearch} />
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
            {data
              .filter((item: EmployeeType) => {
                const keys = [
                  "firstName",
                  "lastName",
                  "jobTitle",
                ] as (keyof EmployeeType)[];
                return search === ""
                  ? true
                  : keys.some((key) =>
                      item[key].toLowerCase().includes(search)
                    );
              })
              .map((employee: EmployeeType) => (
                <tr key={employee.id} className="employee">
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
    </>
  );
};

export default HomePage;
