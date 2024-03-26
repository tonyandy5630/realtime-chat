import { useAuth } from "@/context";
import Chat from "@/types/message.type";
import toLocaleDate from "@/utils/convertTime";
import React, { memo, useEffect, useMemo, useRef } from "react";

type Props = {
  children?: React.ReactNode;
  messages: Array<Chat>;
};

function ChatContainer({ children, messages }: Props) {
  const { user } = useAuth();
  const messageRef = useRef<any>();

  const renderMessage = useMemo(() => {
    return messages.map((i: Chat, index) => (
      <li
        key={index}
        className={`flex flex-col min-w-full my-1 !text-white  ${
          i.user.username === user?.username ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`flex flex-col p-2 rounded-lg ${
            i.user.username === user?.username ? " bg-black" : "bg-neutral-600"
          } max-w-[50%]`}
        >
          {i.message.contents}
        </div>
        <span className='justify-self-end text-black text-sm'>
          {/* {i.user.username === user?.username ? "Me" : i.user?.username} */}
          {toLocaleDate(i.message.createAt)}
        </span>
      </li>
    ));
  }, [messages.length]);

  useEffect(() => {
    if (messageRef && messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;
      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  }, [messages.length]);

  return (
    <>
      <div className='flex justify-center items-center min-w-3/12'>
        <h1 className='font-bold'>Room: {user?.room}</h1>
      </div>
      <div
        className='h-[80%] border relative rounded-md p-3 border-solid border-black min-w-full overflow-y-auto'
        ref={messageRef}
      >
        <ul className='mx-2 overflow-auto min-h-full'>{renderMessage}</ul>
      </div>
    </>
  );
}

export default memo(ChatContainer);
