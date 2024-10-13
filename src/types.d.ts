export interface IMessage {
  author: string;
  message: string;
  _id: string;
  datetime: string;
}

export interface IProps {
  onSendMessage: (author: string, message: string) => void;
}
