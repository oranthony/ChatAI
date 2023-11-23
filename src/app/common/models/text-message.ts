export interface TextMessage {
  type: "text",
  isAnswer: boolean,
  text: string;
}