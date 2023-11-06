import { Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { TextMessage } from 'src/app/common/models/text-message';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent {

  @Input() messageList: TextMessage[] = [];

  hasNewMessageArrived: boolean = false;

  AIProfileIcon: string;
  AIUserIcon: string;

  _messageList: TextMessage[] = [];

  /*@Input() 
  set messageList(messageList: TextMessage[]) {
    console.log("test");
    this._messageList = [...messageList];
    if(!messageList) return;
    this.messageList = messageList;
    
    /*if (messageList && messageList.length != this.messageList.length) {
      this.scrollToBottom();
    }
    this.messageList = messageList;*/
    
  //}
  /*get messageList() {
    return this._messageList;
  }*/

  

  ngOnChanges(changes: SimpleChanges) {
    // Detect new message has arrived
    if(changes["messageList"].currentValue != changes["messageList"].previousValue) {
      console.log("value changed");
      this.hasNewMessageArrived = true;
    }
    
  }

  ngAfterViewChecked(){
    // Scroll to bottom when new message has arrived
    if (this.hasNewMessageArrived) {
      this.hasNewMessageArrived = false;
      this.scrollToBottom();
    }
    
  }


  constructor(private cdRef:ChangeDetectorRef) {
    this.AIProfileIcon = '/assets/logo-short-bw-2.png';
    this.AIUserIcon = '/assets/user-picture.jpg';

    
  }

  scrollToBottom(): void {
    console.log("scroll called")
    const messageListBox = document.getElementById('message-list-container');
    
    if (messageListBox) {
      messageListBox!.scrollTop = messageListBox?.scrollHeight;
    }
    
  }
}
