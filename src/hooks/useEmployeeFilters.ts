import { EmployeeType } from "../types/global";

export const useEmployeeFilters = (
  data: EmployeeType[],
  selectedPosition: string,
  sortKey: keyof EmployeeType,
  sortOrder: "asc" | "desc",
  search: string
) => {
  const filteredEmployees =
    selectedPosition === "All"
      ? data
      : data.filter((employee) => employee.jobTitle === selectedPosition);

  const sortedEmployees = filteredEmployees.sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const searchedEmployees = sortedEmployees.filter((item) => {
    const keys = [
      "firstName",
      "lastName",
      "jobTitle",
    ] as (keyof EmployeeType)[];
    return search === ""
      ? true
      : keys.some((key) =>
          (item[key] as string).toLowerCase().includes(search.toLowerCase())
        );
  });

  return searchedEmployees;
};
