import Chat, { Message } from "@/types/message.type";
import User from "@/types/user.type";
import * as signalR from "@microsoft/signalr";
const URL = process.env.HUB_ADDRESS ?? "http://localhost:5057/chathub"; //or whatever your backend port is

class Connector {
  private connection: signalR.HubConnection;
  public events: (
    onMessageReceived: (user: User, message: Message) => void
  ) => void;
  static instance: Connector;
  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(URL)
      .withAutomaticReconnect()
      .build();
    this.connection.start().catch((err) => document.write(err));
    this.events = (onMessageReceived) => {
      this.connection.on("ReceiveMessage", (user, message) => {
        onMessageReceived(user, message);
      });
    };
  }

  public newMessage = async (messages: string) => {
    await this.connection.invoke("SendMessage", messages);
    return messages;
  };

  public joinRoom = async (user: User) => {
    try {
      await this.connection.invoke("JoinRoom", {
        username: user.username,
        room: user.room,
      });
      return 1;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };
  public static getInstance(): Connector {
    if (!Connector.instance) Connector.instance = new Connector();
    return Connector.instance;
  }
}
export default Connector.getInstance;
