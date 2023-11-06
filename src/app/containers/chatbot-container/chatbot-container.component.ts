import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
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


  
  constructor(private chatbotService: ChatbotService) {
    this.messageList = exampleTextMessage;
  }

  sendMessage(message: string) {
    let userMessage: TextMessage = {
      isAnswer: false,
      text: message
    } ;

    this.messageList.push(userMessage);
    this.messageList = [...this.messageList];
    
    this.chatbotService.post(message).subscribe(
      ((value: TextMessage) => {
        this.messageList.push(value);
        this.messageList = [...this.messageList];
      })
    )
  }

}
