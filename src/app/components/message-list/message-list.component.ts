import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { TextMessage } from 'src/app/common/models/text-message';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent {

  @Input() messageList: TextMessage[] = [];
  @ViewChild('messageListTarget', { read: ElementRef, static:false })
  private myScrollContainer!: ElementRef;

  hasNewMessageArrived: boolean = false;

  AIProfileIcon: string;
  AIUserIcon: string;

  _messageList: TextMessage[] = [];
  

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

  // Scroll list to bottom of ViewChild
  scrollToBottom(): void {
    this.myScrollContainer.nativeElement.scroll({
      top: this.myScrollContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
    
  }
}
