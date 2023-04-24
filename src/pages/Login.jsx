import { useState } from "react";
import login from "../styles/login.scss";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    loading: false,
  });

  const { name, email, password, loading } = data;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields are required");
    } else {
      setData({ ...data, loading: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateDoc(doc(db, "users", user.uid), {
            isOnline: true,
          });
          navigate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setData({ ...data, loading: true });
        });
    }
  };
  return (
    <div className="register">
      <form className="form" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <div className="input">
          <label htmlFor="Name">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label htmlFor="Name">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="form-btn">
          <button type="submit">{loading ? "Logging in ..." : "Login"}</button>
        </div>
      </form>
    </div>
  );
}
