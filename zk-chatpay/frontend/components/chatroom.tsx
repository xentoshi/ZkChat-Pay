import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import styles from "../styles/chat.module.css";
import { RLN, VerificationKey } from "test-rlnjs";
import vkey from '../rln/verification_key.json';
import { RLNFullProof, StrBigInt } from 'test-rlnjs/dist/types/types';
// import { addNewUser } from "./store/users";
import { useEpoch, useAppID, usePublishQueue, usePublishedMsgProofs }  from '../store/store';
import { Registry } from 'test-rlnjs';
import ethers from 'ethers';

// import * as PushAPI from "@pushprotocol/restapi";

// import and use a number of type bigint

const _registry = new Registry()

function ChatRoom({ socket, username, room }) {

  const [epoch, setEpoch] = useEpoch(BigInt(1));
  const [appID, setAppID] = useAppID(BigInt(12345674590));



  const rln = new RLN(
    '/rln/rln.wasm',
    '/rln/rln_final.zkey',
     vkey as VerificationKey,
     appID as bigint

  );
  
  const signal = "This is a test signal"


 async function generateProofWrapper(signal, merkleProof, epoch) {
    const proof = await rln.generateProof(signal, merkleProof, epoch);
    console.log(proof,'proof');
  }
  
  _registry.addMember(rln.commitment)

  const merkleProof = _registry.generateMerkleProof(rln.commitment) 

  console.log(rln, _registry);
  
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

//   addNewUser();


  const sendMessage = async () => {

    await generateProofWrapper(signal,merkleProof,epoch);
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

  // const sendMessageNotif = async (msg) => {
  //   const signer = window?.ethereum.selectedAddress;
  //   try {
  //     const apiResponse = await PushAPI.payloads.sendNotification({
  //       signer,
  //       type: 3,
  //       identityType: 2,
  //       notification: {
  //         title: `Your have recieved a new notification`,
  //         body: `${msg}`,
  //       },
  //       payload: {
  //         title: `Your new collection on rarx is verified`,
  //         body: `Congratulations, now you can sell your nfts via your collection`,
  //       },
  //       recipients: `eip155:80001:${signeradd}`,
  //       channel: `eip155:80001:${CHANNEL_ADDRESS}`,
  //       env: "staging",
  //     });
  //   } catch (err) {
  //     console.error("Error: ", err);
  //   }
  // };

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
