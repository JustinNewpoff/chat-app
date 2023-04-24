import { useEffect, useState, useRef } from "react";
import home from "../styles/home.scss";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, auth, storage } from "../firebase";
import User from "../components/User";
import MessageForm from "../components/MessageForm";
import Message from "../components/Message";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState(null);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [image, setImage] = useState("");
  const [selectedUser, setSelectedUser] = useState({});

  const user1 = auth.currentUser.uid;
  const inputRef = useRef();

  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("uid", "!=", auth.currentUser.uid)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);

  const selectUser = async (person) => {
    setChat(person);
    const user2 = person.uid;
    setSelectedUser(person);
    const id = user1 > user2 ? user1 + user2 : user2 + user1;

    const messageRef = collection(db, "messages", id, "chat");
    const q = query(messageRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      setConversation(messages);
    });
  };

  const getMessage = (e) => {
    setText(e.target.value);
  };

  const selectImage = (e) => {
    setImage(e.target.files[0]);
  };

  const submitMessage = async (e) => {
    e.preventDefault();
    if (text === "") {
      return;
    }
    setMessage(text);
    const user2 = chat.uid;
    const id = user1 > user2 ? user1 + user2 : user2 + user1;

    let url;
    if (image) {
      const imageRef = ref(storage, image.name);

      const snap = await uploadBytes(imageRef, image);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: serverTimestamp(),
      media: url || "",
    });
    inputRef.current.value = "";
    setText("");
    url = "";
  };

  return (
    <div className="home">
      <div className="users-container">
        {users.map((user, i) => {
          return (
            <User
              user={user}
              key={i}
              selectUser={selectUser}
              selectedUser={selectedUser}
            />
          );
        })}
      </div>
      <div className="message-container">
        {chat ? (
          <>
            <div className="message-user">
              <h1>{chat.name}</h1>
            </div>
            <div className="messages">
              {conversation.length > 0
                ? conversation.map((convo, i) => {
                    return <Message key={i} convo={convo} user1={user1} />;
                  })
                : ""}
            </div>
            <div>
              <MessageForm
                text={text}
                setText={setText}
                getMessage={getMessage}
                message={message}
                setMessage={setMessage}
                submitMessage={submitMessage}
                selectImage={selectImage}
                inputRef={inputRef}
              />
            </div>
          </>
        ) : (
          <h2 className="message-user">
            Select a user to start a conversation
          </h2>
        )}
      </div>
    </div>
  );
}
