import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/auth/authSlice";
import "./header.styles.scss";

// header
const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logoutUser());
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h2>ShopNest</h2>
        </Link>

        <nav>
          <Link to="/">Home</Link>
          {user ? (
            <>
              <Link to="/cart">
                Cart <span> ({cart ? cart.length : null}) </span>{" "}
              </Link>
              <Link to="/orders">Orders</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
