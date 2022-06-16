import { MessageType } from "../types";

export class Data {
  readonly Messages: MessageType[] = [
    {
      timeStamp: new Date(),
      content: "hello",
      author: "1",
    },
    {
      timeStamp: new Date(),
      content: "hello 2",
      author: "2",
    },
    {
      timeStamp: new Date(),
      content: "hello 3",
      author: "1",
    },
    {
      timeStamp: new Date(),
      content: "hello 4",
      author: "2",
    },
  ];
  public getMessages(): MessageType[] {
    return this.Messages;
  }
}
