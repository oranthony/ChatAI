import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { TextMessage } from 'src/app/common/models/text-message';
import { ChangeDetectorRef } from '@angular/core';
import { MessageState, SuccessMessageState } from 'src/app/common/models/message-state';
import { PictureMessage } from 'src/app/common/models/picture-message';
import { SafeUrl } from '@angular/platform-browser';
import { Observable, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent {

  @Input()
  messageState!: Observable<MessageState>;
  @Input() messageList!: (TextMessage | PictureMessage)[];
  @ViewChild('messageListTarget', { read: ElementRef }) private myScrollContainer!: ElementRef;

  hasNewMessageArrived: boolean = false;
  isPictureFullScreen: boolean = false;
  fullScreenPictureUrl!: SafeUrl;

  AIProfileIcon: string;
  UserIcon: string;

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    // Detect new message has arrived to trigger auto-scroll
    if (changes["messageList"].currentValue != changes["messageList"].previousValue) {
      console.log("value changed");
      this.hasNewMessageArrived = true;
    }
  }

  ngAfterViewChecked() {
    // Scroll to bottom when new message has arrived
    if (this.hasNewMessageArrived) {
      this.hasNewMessageArrived = false;
      this.scrollToBottom();
    }
  }

  constructor(private cdRef: ChangeDetectorRef) {
    this.AIProfileIcon = '/assets/logo-short-bw-2.png';
    this.UserIcon = '/assets/user-picture.jpg';
  }

  // Scroll list to bottom of ViewChild
  scrollToBottom(): void {
    this.myScrollContainer.nativeElement.scroll({
      top: this.myScrollContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  // Display the picture in full screen
  showPictureFullPage(pictureUrl: SafeUrl) {
    this.fullScreenPictureUrl = pictureUrl;
    this.isPictureFullScreen = true;
  }

  closeFullScreenPicture() {
    console.log("close");
    this.isPictureFullScreen = false;
  }

  castMessageAsPictureMessage(message: any): PictureMessage {
    return message;
  }

  castMessageAsTextMessage(message: any): TextMessage {
    return message;
  }
}
