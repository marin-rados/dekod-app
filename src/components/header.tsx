import { useNavigate } from "react-router";
import logoImg from "../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <img onClick={() => navigate("/")} src={logoImg} alt="Logo Image" />
      <p onClick={() => navigate("/")}>Employees</p>
      <p onClick={() => navigate("/employee/new")}>Add Employee</p>
    </div>
  );
};

export default Header;
