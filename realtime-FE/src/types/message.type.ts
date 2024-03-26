import User from "./user.type";

type Chat = {
  user: User;
  message: Message;
};

export type Message = {
  contents: string;
  createAt: Date;
};

export default Chat;
