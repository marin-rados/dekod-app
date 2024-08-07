export type EmployeeType = {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  jobTitle: string;
};

export type SearchStoreType = {
  search: string;
  setSearch: (search: string) => void;
};

export type AddEditEmployeeType = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  jobTitle: string;
};
