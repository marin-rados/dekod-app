import { EmployeeType } from "../types/global";

// utils/employeeUtils.ts
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getData = async (
  setData: React.Dispatch<React.SetStateAction<EmployeeType[]>>
) => {
  try {
    const res = await fetch("/api");
    if (res.ok) {
      const result = await res.json();
      setData(result.data);
    } else {
      console.log(res);
    }
  } catch (err) {
    console.log(err);
  }
};
