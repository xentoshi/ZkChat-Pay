import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import styles from "../styles/chat.module.css";
import { RLN, VerificationKey } from "rlnjs";
import vkey from '../rln/verification_key.json';
import { RLNFullProof, StrBigInt } from 'rlnjs/dist/types/types';
// import { addNewUser } from "./store/users";
import { useEpoch, useAppID, usePublishQueue, usePublishedMsgProofs }  from '../store/store';
import { Registry } from 'rlnjs';


// import and use a number of type bigint



function ChatRoom({ socket, username, room }) {

  const [epoch, setEpoch] = useEpoch(BigInt(1));
  const [appID, setAppID] = useAppID(BigInt(12345674590));

  // const _registry = new Registry()


  // const rln = new RLN(
  //   '/rln/rln.wasm',
  //   '/rln/rln_final.zkey',
  //    vkey as VerificationKey,
  //    appID as bigint

  // );
  
  // _registry.addMember(rln.commitment)

  // console.log(rln, _registry);
  
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

//   addNewUser();


  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        date: new Date(Date.now()).toDateString(),
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  console.log(messageList,"messageList");

  return (
    <div className={styles.chatwindow}>
      <div className={styles.chatheader}>
        <p>Live Chat in Room {room} </p>
      </div>
      <div className={styles.chatbody}>
        <ScrollToBottom className={styles.messagecontainer} >
          {messageList.map((messageContent) => {
            return (
              <div
                className={styles.message}
                key={messageContent.time.toString()}
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className={styles.messagecontent}>
                    <p>{messageContent.message}</p>
                  </div>
                  <div className={styles.messagemeta}>
                    <p id="time">{messageContent.time}</p>
                    <p id="date">{messageContent.date}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className={styles.chatfooter}>
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default ChatRoom;
