import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { containersName } from 'src/environments/environment';

/**
 * Service used to allow message-suggestion component to send data to parent container (chatbot-container, picture-gen-container...).
 * I use a service here to allow communication between components that are deep down the component tree and parent container.
 * Using a service prevents nested Input and Output in multiple child components.
 */

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {

  constructor() { }

  // Notification torwards Chatbot container
  private notificationToChatbotContainer = new Subject<string>();
  public notificationForChatbotContainerReceived = this.notificationToChatbotContainer.asObservable();

  // Notification torwards Picture-Gen container
  private notificationToPictureGenContainer = new Subject<string>();
  public notificationForPictureContainerReceived = this.notificationToPictureGenContainer.asObservable();

  notify(suggestion: string, target: string) {
    // This is where the logic choose which container should receive the event
    if (target == containersName.CHATBOT) {
      this.notificationToChatbotContainer.next(suggestion);
    }
    if (target == containersName.PICTUREGEN) {
      this.notificationToPictureGenContainer.next(suggestion);
    }
    console.log(suggestion);
  }
}