import "./Header.css";

const Header = ({ title, leftchild, rightchild }) => {
  return (
    <div className="Header">
      <div className="header_left">{leftchild}</div>
      <div className="header_center">{title}</div>
      <div className="header_right">{rightchild}</div>
    </div>
  );
};
export default Header;
