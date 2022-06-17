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
        author: { id: "1", name: "Giorgi" },
      },
      {
        timeStamp: new Date(),
        content: "hello 2",
        author: { id: "2", name: "Guest" },
      },
      {
        timeStamp: new Date(),
        content: "hello 2",
        author: { id: "2", name: "Guest" },
      },
      {
        timeStamp: new Date(),
        content: "hello 2",
        author: { id: "2", name: "Guest" },
      },
      {
        timeStamp: new Date(),
        content: "hello 3",
        author: { id: "1", name: "Giorgi" },
      },
      {
        timeStamp: new Date(),
        content: "hello 4",
        author: { id: "1", name: "Giorgi" },
      },
    ];
  }
}
