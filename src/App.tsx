import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import Layout from "./components/layout";
import AddEmployee from "./pages/addEmployee";
import NoMatch from "./pages/noMatch";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="employee/new" element={<AddEmployee />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
