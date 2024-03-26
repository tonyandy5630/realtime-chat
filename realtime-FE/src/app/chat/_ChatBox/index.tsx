"use client";
import React, { useEffect, useState } from "react";
import Connector from "@/utils/signalHub";
import ChatForm from "../_FormChat";
import ChatContainer from "../_ChatContainer";
import Chat from "@/types/message.type";
import { useAuth } from "@/context";
import { useRouter } from "next/navigation";

function ChatBox() {
  const [connector, setConnector] = useState<any>();
  const [chat, setChat] = useState<Array<Chat>>([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.room === undefined) router.push("/");

    if (connector === undefined) {
      const cn = Connector();
      setConnector(cn);
      return;
    }

    const { events } = connector;
    const handleMessageReceived = (user: any, newMessage: any) => {
      setChat((prevMessages) => [
        ...prevMessages,
        { user, message: newMessage },
      ]);
    };

    // Subscribe to message received events
    events(handleMessageReceived);

    // Clean up the subscription when component unmounts
    return () => {
      events((user: any, newMessage: any) => {}); // Unsubscribe
    };
  }, [connector]);

  return (
    <div className='min-w-screen w-screen h-screen py-4 flex min-h-screen justify-center items-start'>
      <div className='flex flex-col w-6/12 h-full'>
        <ChatContainer messages={chat} />
        <ChatForm />
      </div>
    </div>
  );
}

export default ChatBox;
