import { AddEditEmployeeType } from "../types/global";

export const validateEmployee = (
  employee: AddEditEmployeeType,
  errors: Record<string, boolean>,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
): boolean => {
  let valid = true;
  const newErrors = { ...errors };

  Object.keys(employee).forEach((key) => {
    if (employee[key as keyof AddEditEmployeeType] === "") {
      newErrors[key as keyof typeof errors] = true;
      valid = false;
    } else {
      newErrors[key as keyof typeof errors] = false;
    }
  });

  setErrors(newErrors);
  return valid;
};

export const validateDate = (
  dateString: string,
  setDateError: React.Dispatch<React.SetStateAction<string | null>>
): boolean => {
  const date = new Date(dateString);
  const minDate = new Date("1900-01-01");
  const maxDate = new Date();

  if (date < minDate) {
    setDateError("Date of Birth cannot be before 1900.");
    return false;
  } else if (date > maxDate) {
    setDateError("Date of Birth cannot be in the future.");
    return false;
  } else {
    setDateError(null);
    return true;
  }
};

export const formatToDateInputValue = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
