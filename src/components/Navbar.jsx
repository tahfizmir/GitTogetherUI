import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useNavigate, Link } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );

      navigate("/login");
      dispatch(removeUser());
    } catch (err) {
      console.error("Logout failed:", err);
      navigate("/login");
    }
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          🤖 GitTogether
        </Link>
      </div>
      <div className="flex items-center gap-3 mx-5">
        {user && (
          <>
            <p className="text-sm font-medium">Welcome! {user.firstName}</p>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full overflow-hidden">
                  <img
                    alt="Profile picture"
                    src={
                      user.photoUrl ||
                      "https://www.w3schools.com/howto/img_avatar.png"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
