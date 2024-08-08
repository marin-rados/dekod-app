import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";

import { AddEditEmployeeType } from "../types/global";

import {
  validateEmployee,
  validateDate,
  formatToDateInputValue,
} from "../utils/employeeFormUtils";

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

  const [errors, setErrors] = useState<Record<string, boolean>>({
    firstName: false,
    lastName: false,
    dateOfBirth: false,
    jobTitle: false,
  });

  const [dateError, setDateError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && state?.employee) {
      setEmployee(state.employee);
    }
  }, [isEdit, state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name !== "dateOfBirth" && /[^a-zA-Z\s]/.test(value)) {
      return;
    }

    setEmployee({ ...employee, [name]: value });

    if (name === "dateOfBirth") {
      validateDate(value, setDateError);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmployee(employee, errors, setErrors)) {
      console.log("Employee data:", employee);
      handleRedirect();
    }
  };

  const handleRedirect = () => {
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  return (
    <div className="add">
      <h2>{isEdit ? "Edit Employee" : "Add New Employee"}</h2>
      <form className="add__form" onSubmit={handleSubmit}>
        <div className="add__form__input">
          <label>First Name:</label>
          <input
            className="form-inputs"
            type="text"
            name="firstName"
            value={employee.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
        </div>
        <div className="add__form__input">
          <label>Last Name:</label>
          <input
            className="form-inputs"
            type="text"
            name="lastName"
            value={employee.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </div>
        <div className="add__form__input">
          <label>Date of Birth:</label>
          <input
            className="form-inputs"
            type="date"
            name="dateOfBirth"
            value={formatToDateInputValue(employee.dateOfBirth)}
            onChange={handleChange}
            placeholder="Date of Birth"
            required
          />
          {errors.dateOfBirth && (
            <span className="error">Date of Birth is required</span>
          )}
          {dateError && <span className="error">{dateError}</span>}
        </div>
        <div className="add__form__input">
          <label>Job Title:</label>
          <input
            className="form-inputs"
            type="text"
            name="jobTitle"
            value={employee.jobTitle}
            onChange={handleChange}
            placeholder="Job Title"
            required
          />
        </div>
        <button className="add__form__btn" type="submit">
          {isEdit ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
