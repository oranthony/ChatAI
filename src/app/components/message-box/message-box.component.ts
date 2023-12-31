import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import {take} from 'rxjs/operators';
import { MessageState } from 'src/app/common/models/message-state';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent {
  @Input() messageState!: Observable<MessageState>;
  @Output() sendMessage = new EventEmitter();

  @ViewChild('autosize')
  autosize!: CdkTextareaAutosize;

  @ViewChild('formInput')
  formInput!: ElementRef;
  
  question: string = "";
  ImagePath: string;

  constructor(private _ngZone: NgZone) {
    this.ImagePath = '/assets/send.png';
  }

  // Expand textarea when text takes multiples lines
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  onSendMessage() {
    if (this.question != '') {
      this.sendMessage.emit(this.question);
      this.question = "";
    }

    // Dismiss keyboard on iOS Safari Webkit
    this.formInput.nativeElement.blur();
  }

  onKeydown(event: Event){
    // Prevent enter key from creating a new line
    event.preventDefault();
  }
}
