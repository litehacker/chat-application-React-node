export interface MessageBubbleType {
  message: string;
  source: "received" | "sent";
}
export interface MessageType {
  timeStamp: Date;
  content: string;
  author: UserType["id"];
}
export interface UserType {
  id: string;
  name: string;
}
