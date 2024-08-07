import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { AddEditEmployeeType } from "../types/global";

type Props = {
  isEdit: boolean;
};

const AddEmployee = ({ isEdit }: Props) => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [employee, setEmployee] = useState<AddEditEmployeeType>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    jobTitle: "",
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    dateOfBirth: false,
    jobTitle: false,
  });

  useEffect(() => {
    if (isEdit && state?.employee) {
      setEmployee(state.employee);
    }
  }, [isEdit, state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const validate = (): boolean => {
    let valid = true;
    let newErrors = { ...errors };

    Object.keys(employee).forEach((key) => {
      if ((employee as any)[key] === "") {
        newErrors[key as keyof typeof errors] = true;
        valid = false;
      } else {
        newErrors[key as keyof typeof errors] = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Employee data:", employee);
      handleRedirect();
    }
  };

  const handleRedirect = () => {
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  const formatToDateInputValue = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="add">
      <h2>{isEdit ? "Edit Employee" : "Add New Employee"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={employee.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
          {errors.firstName && (
            <span style={{ color: "red" }}>Required field</span>
          )}
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={employee.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
          {errors.lastName && (
            <span style={{ color: "red" }}>Required field</span>
          )}
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="birthDate"
            value={formatToDateInputValue(employee.dateOfBirth)}
            onChange={handleChange}
            placeholder="Birth Date"
          />
          {errors.dateOfBirth && (
            <span style={{ color: "red" }}>Required field</span>
          )}
        </div>
        <div>
          <label>Job Title:</label>
          <input
            type="text"
            name="jobTitle"
            value={employee.jobTitle}
            onChange={handleChange}
            placeholder="Job Title"
          />
          {errors.jobTitle && (
            <span style={{ color: "red" }}>Required field</span>
          )}
        </div>
        <button type="submit">{isEdit ? "Update" : "Save"}</button>
      </form>
    </div>
  );
};

export default AddEmployee;
