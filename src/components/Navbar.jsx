import { useContext } from "react";
import { Link } from "react-router-dom";
import navbar from "../styles/navbar.scss";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <h3>
        <Link to="/">Messenger</Link>
      </h3>
      {user ? (
        <div className="links">
          <Link to="/profile">Profile</Link>
          <Link
            onClick={() =>
              updateDoc(doc(db, "users", user.uid), {
                isOnline: false,
              }).then(() => {
                signOut(auth).then(() => {
                  navigate("/login");
                });
              })
            }
          >
            Sign Out
          </Link>
        </div>
      ) : (
        <div className="links">
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
}
