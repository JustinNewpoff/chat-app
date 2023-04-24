import { useState, useEffect, useContext } from "react";
import profile from "../styles/profile.scss";
import { AiFillCamera } from "react-icons/ai";
import { AuthContext } from "../context/auth";
import { doc, onSnapshot, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "../firebase";
import avatar from "../assets/avatar.png";

export default function Profile() {
  const [userImg, setUserImg] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [person, setPerson] = useState({});

  useEffect(() => {
    const user = auth.currentUser;

    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      setPerson(doc.data());
    });
    if (userImg !== "") {
      const storageRef = ref(storage, userImg.name);
      const metadata = {
        contentType: "image/*",
      };
      uploadBytes(storageRef, userImg, metadata).then((snapshot) => {
        getDownloadURL(ref(storage, userImg.name)).then((url) => {
          updateDoc(doc(db, "users", user.uid), {
            profilePic: url,
          });
        });
      });
    }
  }, [userImg]);

  return person ? (
    <div className="profile">
      <div className="content-container">
        <div className="image-container">
          {person.profilePic ? (
            <img src={person.profilePic} alt="profile picture" />
          ) : (
            <img src={avatar} alt="profile picture" />
          )}

          <div className="overlay">
            <label htmlFor="camera">
              <AiFillCamera className="camera" />
            </label>
            <div>
              <input
                id="camera"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => setUserImg(e.target.files[0])}
              />
            </div>
          </div>
        </div>
        <div className="text-container">
          <h3>{person.name}</h3>
          <p>{person.email}</p>
          <hr />
          <small>
            Joined on...
            {person.timestamp ? person.timestamp.toDate().toDateString() : ""}
          </small>
        </div>
      </div>
    </div>
  ) : null;
}
