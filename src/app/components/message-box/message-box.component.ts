import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent {
  @Output() sendMessage = new EventEmitter();

  @ViewChild('autosize')
  autosize!: CdkTextareaAutosize;
  
  question: string = "";
  ImagePath: string;

  constructor(private _ngZone: NgZone) {
    this.ImagePath = '/assets/send.png';
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  onSendMessage() {
    if (this.question != '') {
      this.sendMessage.emit(this.question);
      this.question = "";
    }
  }

  onKeydown(event: Event){
    event.preventDefault();
  }
}
