import { useState } from "react";
import register from "../styles/register.scss";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    loading: false,
  });
  const [id, setId] = useState(null);

  const { name, email, password, loading } = data;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData({ ...data, loading: true });
    if (!name || !email || !password) {
      toast.error("All fields are required");
    } else {
      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          setData({ ...data, loading: false });
          navigate("/login");
          setDoc(doc(db, "users", user.uid), {
            name,
            email,
            timestamp: serverTimestamp(),
            isOnline: true,
            profilePic: null,
            uid: userCredential.user.uid,
          });
        }
      );
    }
  };
  return (
    <div className="register">
      <form className="form" onSubmit={handleSubmit}>
        <h3>Create An Account</h3>
        <div className="input">
          <label htmlFor="Name">Name</label>
          <input type="text" name="name" value={name} onChange={handleChange} />
        </div>
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
          <button type="submit">{loading ? "Creating ..." : "Register"}</button>
        </div>
      </form>
    </div>
  );
}
