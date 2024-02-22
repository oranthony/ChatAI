import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { containersName } from 'src/environments/environment';

/**
 * Service used to allow message-suggestion component to send data to parent container (chatbot-container, picture-gen-container...).
 * I use a service here to allow communication between components that are deep down the component tree and parent container.
 * Using a service prevents nested Input and Output in multiple child components.
 * 
 * chatbot-container and picture-gen-container use Inputs() to communicate the list of suggested messages. This service is used to 
 * trigger selection event up to the parent container.
 * 
 * This service is responsible for routing the selection event to the right container. 
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
      console.log("service send notif");
      this.notificationToPictureGenContainer.next(suggestion);
    }
  }
}
