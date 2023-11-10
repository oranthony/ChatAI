export type MessageState =
  | LoadingMessageState
  | SuccessMessageState
  | ErrorMessageState


export type LoadingMessageState = {
  state: "Loading";
}

export type SuccessMessageState = {
  state: "Success";
}

export type ErrorMessageState = {
  state: "Error";
  error: {message: string}
}