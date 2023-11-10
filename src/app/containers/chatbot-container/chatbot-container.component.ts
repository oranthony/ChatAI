import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ErrorMessageState, LoadingMessageState, MessageState, SuccessMessageState } from 'src/app/common/models/message-state';
import { TextMessage } from 'src/app/common/models/text-message';
import { ChatbotService } from 'src/app/common/services/chatbot.service';
import { environment } from 'src/environments/environment';

const exampleTextMessage: TextMessage[] = [{isAnswer: false, text:"dfsdfgdfgdfg"}, {isAnswer: true, text:"hgnjjhghjkhjkjhkg"}, {isAnswer: false, text:"dfsdfgdfgdfg"}, {isAnswer: true, text:"hgnjjhghjkhjkjhkg"}, {isAnswer: false, text:"dfsdfgdfgdfg"}, {isAnswer: true, text:"hgnjjhghjkhjkjhkg"}, {isAnswer: false, text:"dfsdfgdfgdfg"}, {isAnswer: true, text:"hgnjjhghjkhjkjhkg"}, {isAnswer: false, text:"dfsdfgdfgdfg"}, {isAnswer: true, text:"hgnjjhghjkhjkjhkg"} ]

@Component({
  selector: 'app-chatbot-container',
  templateUrl: './chatbot-container.component.html',
  styleUrls: ['./chatbot-container.component.scss']
})
export class ChatbotContainerComponent {
  //message$!: Observable<TextMessage[]>;
  messageList: TextMessage[] = [];
  title: string = "Chatbot  AI";
  messageState!: MessageState;

  private static successMessageState: SuccessMessageState = {state: "Success"};
  private static loadingMessageState: LoadingMessageState = {state: "Loading"};
  
  constructor(private chatbotService: ChatbotService) {
    // Initialize message status with success value
    this.messageState = ChatbotContainerComponent.successMessageState;
  }

  onSendMessage(message: string) {
    this.messageState = ChatbotContainerComponent.loadingMessageState;

    let userMessage: TextMessage = {
      isAnswer: false,
      text: message
    } ;

    this.messageList.push(userMessage);
    this.messageList = [...this.messageList];
    
    this.chatbotService.post(message).subscribe(
      res => {
        this.messageList.push(res);
        this.messageList = [...this.messageList];
        this.messageState = ChatbotContainerComponent.successMessageState;
      },
      err => {
        let errorMessageState: ErrorMessageState = {state: "Error", error: {message: err}};
        this.messageState = errorMessageState;
      }
    );

      /*((value: TextMessage) => {
        this.messageList.push(value);
        this.messageList = [...this.messageList];
        this.messageState = ChatbotContainerComponent.successMessageState;;
      })
    )*/
  }

}
