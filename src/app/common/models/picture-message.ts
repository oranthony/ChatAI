import { SafeUrl } from "@angular/platform-browser";

export interface PictureMessage {
  type: "picture",
  isAnswer: boolean,
  picture: any;
}
