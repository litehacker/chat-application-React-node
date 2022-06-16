import { User } from "../InterfaceTypes/intex";
import { MessageType } from "../types";

export class Data {
  public getUser(): User {
    return {
      name: "Giorgi",
      id: "1",
    };
  }

  public getMessages(): MessageType[] {
    return [
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
        content: "hello 2",
        author: "2",
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
  }
}
