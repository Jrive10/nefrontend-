import { Link } from "react-router-dom";

function Header(props) {
  return (
    <nav className="nav">
      <Link to="/">
        <div>Welcome To Casatrack App</div>
      </Link>
      <Link to="/profile">Profile</Link> {/* Add this link */}
    </nav>
  );
}

export default Header;
