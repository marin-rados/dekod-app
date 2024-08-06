import { useEffect, useState } from "react";

export type EmployeeType = {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  jobTitle: string;
};

const HomePage = () => {
  const [data, setData] = useState<EmployeeType[]>([]);

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

  return (
    <>
      <div className="home">
        <p>hi i am a homepage</p>
        {data.map((employee) => {
          return (
            <div key={employee.id}>
              <p>
                {employee.firstName} {employee.lastName}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
