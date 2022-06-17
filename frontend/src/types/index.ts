export interface MessageBubbleType {
  message: string;
  source: "received" | "sent";
}
export interface MessageType {
  timeStamp: Date;
  content: string;
  author: UserType;
  dark?: boolean;
}
export interface UserType {
  id: string;
  name: string;
}
