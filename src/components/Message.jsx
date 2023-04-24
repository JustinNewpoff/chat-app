import { useRef, useEffect } from "react";
import message from "../styles/message.scss";
import Moment from "react-moment";

export default function Message({ convo, user1 }) {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [convo]);

  return (
    <>
      <div
        className={convo.from === user1 ? "message-user1" : "message-user2"}
        ref={scrollRef}
      >
        <h5>{convo.text}</h5>
      </div>
      <div
        className="message-img"
        style={{ alignSelf: convo.from === user1 ? "flex-start" : "flex-end" }}
      >
        {convo.media !== "" && <img src={convo.media} alt="picture" />}
      </div>
      {convo.createdAt && (
        <small className={convo.from === user1 ? "time-user1" : "time-user2"}>
          <Moment fromNow>{convo.createdAt.toDate()}</Moment>
        </small>
      )}
    </>
  );
}
