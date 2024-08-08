import { useNavigate } from "react-router";
import logoImg from "../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <img
        className="header__logo"
        onClick={() => navigate("/")}
        src={logoImg}
        height={60}
        alt="Logo Image"
      />
      <p className="header__link" onClick={() => navigate("/")}>
        Employee List
      </p>
      <p className="header__link">About</p>
      <p className="header__link">Contact</p>
    </div>
  );
};

export default Header;
