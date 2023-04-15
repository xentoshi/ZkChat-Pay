import styles from "../styles/chat.module.css"
import io , {Socket} from "socket.io-client";
import { useState } from "react";
import ChatRoom from "../components/chatroom";
import React from "react";
// import { SismoConnect, SismoConnectClientConfig ,  AuthType  } from "@sismo-core/sismo-connect-client";
import { AuthRequest } from "@sismo-core/sismo-connect-client";
import { useEffect } from "react";
import { SismoConnectButton, AuthType, SismoConnectClientConfig, SismoConnectResponse } from "@sismo-core/sismo-connect-react";

// @ts-ignore
const socket: Socket = io.connect("http://localhost:3001");

function Chat() {

  const sismoConnectConfig: SismoConnectClientConfig = {
    appId: "0x4772420a08b6e20ee25ff1adb7610c17",
    vaultAppBaseUrl: "https://xentoshi-super-duper-chainsaw-xv4jx9rw67c6x5j-3000.preview.app.github.dev/chat"
  };


  const AUTH: AuthRequest = { 
    authType: AuthType.GITHUB,
  };



  const [sismoConnected, setSismoConnected] = useState(false);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  // const handleSismoConnectClick = () => {
  //   sismoConnect.request({ auth: AUTH });
  //   setSismoConnected(true);
  // };
  return (
    <div className={styles.Chat}>
      {!showChat ? (
        <div className={styles.joinChatContainer}>
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <SismoConnectButton 
          appId={"0x4772420a08b6e20ee25ff1adb7610c17"}

          // claims={[{
          //     groupId: "0x42c768bb8ae79e4c5c05d3b51a4ec74a"
          // }]}
          
      
          auths={[{
              authType: AuthType.VAULT,
          },
          {authType: AuthType.GITHUB
          }]}
          
          signature={{
              message: "Hello, Welcome to zKConnect&pay"
          }}
          //After user redirection get a response containing his proofs 
          onResponse={async (response: SismoConnectResponse) => {
            console.log(response,'response from sismo');
        //Send the response to your server to verify it
        //thanks to the @sismo-core/sismo-connect-server package
          }}
          onResponseBytes={async (bytes: string) => {
              //Send the response to your contract to verify it
              //thanks to the @sismo-core/sismo-connect-solidity package
          }}
      />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <ChatRoom socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default Chat;
