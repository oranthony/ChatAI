import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { TextMessage } from 'src/app/common/models/text-message';
import { ChangeDetectorRef } from '@angular/core';
import { MessageState, SuccessMessageState } from 'src/app/common/models/message-state';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent {

  @Input()
  messageState!: MessageState;
  @Input() messageList: TextMessage[] = [];
  @ViewChild('messageListTarget', { read: ElementRef, static:false })
  private myScrollContainer!: ElementRef;

  hasNewMessageArrived: boolean = false;

  AIProfileIcon: string;
  UserIcon: string;

  ngOnChanges(changes: SimpleChanges) {
    // Detect new message has arrived to trigger auto-scroll
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
    this.UserIcon = '/assets/user-picture.jpg';
    let success: SuccessMessageState = {state: "Success"};
    this.messageState = success;
  }

  // Scroll list to bottom of ViewChild
  scrollToBottom(): void {
    this.myScrollContainer.nativeElement.scroll({
      top: this.myScrollContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
    
  }
}
