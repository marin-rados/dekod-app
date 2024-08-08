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

  const [dateError, setDateError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && state?.employee) {
      setEmployee(state.employee);
    }
  }, [isEdit, state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });

    if (name === "dateOfBirth") {
      validateDate(value);
    }
  };

  //check for empty inputs
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

  //redirect to homepage
  const handleRedirect = () => {
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  //form submit, console log values, redirect user to homepage/employee list
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Employee data:", employee);
      handleRedirect();
    }
  };

  //check date values
  const validateDate = (dateString: string) => {
    const date = new Date(dateString);
    const minDate = new Date("1900-01-01");
    const maxDate = new Date();

    if (date < minDate) {
      setDateError("Date of Birth cannot be before 1900.");
    } else if (date > maxDate) {
      setDateError("Date of Birth cannot be in the future.");
    } else {
      setDateError(null);
    }
  };

  //format date value
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
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={employee.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formatToDateInputValue(employee.dateOfBirth)}
            onChange={handleChange}
            placeholder="Date of Birth"
            required
          />
        </div>
        <div>
          <label>Job Title:</label>
          <input
            type="text"
            name="jobTitle"
            value={employee.jobTitle}
            onChange={handleChange}
            placeholder="Job Title"
            required
          />
          {errors.dateOfBirth && (
            <span className="error">Date of Birth is required</span>
          )}
          {dateError && <span className="error">{dateError}</span>}
        </div>
        <button type="submit">{isEdit ? "Update" : "Save"}</button>
      </form>
    </div>
  );
};

export default AddEmployee;
