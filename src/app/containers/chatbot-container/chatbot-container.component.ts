import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AiModelCommunicatorCreator, ConcreteBlenderbot3BCommunicatorCreator, ConcreteBlenderbotCommunicatorCreator, ConcreteDialogptCommunicatorCreator, ConcreteFalconCommunicatorCreator, ConcreteLlamaCommunicatorCreator } from 'src/app/common/factories/aimodel-communicator-factory';
import { ErrorMessageState, LoadingMessageState, MessageState, SuccessMessageState } from 'src/app/common/models/message-state';
import { TextMessage } from 'src/app/common/models/text-message';
import { TextMessageService } from 'src/app/common/services/text-message.service';
import { containersName, environment, textMessageSugestions } from 'src/environments/environment';
import { conversationalModelsName } from 'src/environments/environment.development';
import { Store, select } from '@ngrx/store';

import { addAnswerAI, addUserQuestion, askAnswerAI, setAiModelName } from 'src/app/state/chatbot/chatbot.actions';
import { selectAiModelName, selectMessageList, selectMessageState } from 'src/app/state/chatbot/chatbot.reducer';
import { PictureMessage } from 'src/app/common/models/picture-message';
import { SuggestionsService } from 'src/app/common/services/suggestions.service';
//import { mySignal } from 'src/app/components/message-suggestions/message-suggestions.component';

@Component({
  selector: 'app-chatbot-container',
  templateUrl: './chatbot-container.component.html',
  styleUrls: ['./chatbot-container.component.scss']
})
export class ChatbotContainerComponent {
  // Title displayed in the top bar
  title: string = "Chatbot  AI";
  // Name of this container passed down to message-suggestion component. Used to treack down the source of the suggestions.
  containerName = containersName.CHATBOT;

  // Contains all messages, user questions and AI answers
  messageList$: Observable<(TextMessage | PictureMessage)[]>;

  // Contains request state (success, loading or failed)
  messageState$: Observable<MessageState>;

  // Contains the names of the available models
  modelList: string[] = [];
  // Name of the selected model used to generate answers
  selectedModelName$: Observable<string>;

  // Instantiate all concrete items from factory
  private aiModelCommunicatorCreator!: AiModelCommunicatorCreator;
  private readonly blenderbotCommunicator = new ConcreteBlenderbotCommunicatorCreator();
  private readonly blenderbot3BCommunicator = new ConcreteBlenderbot3BCommunicatorCreator();
  private readonly dialogptCommunicator = new ConcreteDialogptCommunicatorCreator();

  // Holds the suggestions of messages displayed in message-list component
  messageSuggestionsList: string[];

  constructor(private textMessageService: TextMessageService, private suggestionService: SuggestionsService, private store: Store) {
    // Assign all observable
    this.messageState$ = this.store.pipe(select(selectMessageState));
    this.messageList$ = this.store.pipe(select(selectMessageList));
    this.selectedModelName$ = this.store.pipe(select(selectAiModelName));
    this.setModelCommunicator();

    // Fill modelList with the names of the models stored in environment variable
    Object.entries(conversationalModelsName).forEach(([key, value]) => {
      this.modelList?.push(value);
    });

    // Fill array of suggestions of messages based on data retreived from local JSON
    this.messageSuggestionsList = textMessageSugestions;

    // React when user click on suggested message
    this.suggestionService.notificationForChatbotContainerReceived.subscribe(
      suggestion => {
        // When click on suggested message, the corresponding message is send
        this.onSendMessage(suggestion);
      }
    )

    //mySignal.subscribe((value) => {})
  }

  // When user sends a message
  onSendMessage(message: string) {
    //TODO: finish implementing
    // Hides suggestions when a message is send (once a conversation is started)
    //if (this.messageSuggestionsList.length != 0) {
      //this.messageSuggestionsList = [];
    //}

    // Create TextMessage Object with user message
    let userMessage = this.createUserMessage(message);

    // Add user message to the list of messages
    this.addUserMessageToList(userMessage);

    // Set the API URL for the model
    this.textMessageService.setReourceUrl(this.aiModelCommunicatorCreator.getAPIUrl());

    // Dispatch action to ask answer to AI via dedicated effect
    this.store.dispatch(askAnswerAI({ message: message }));
  }

  // When user selects a model, the selected model is updated and the conresponding concrete builder is asigned as global variable
  onChoosenModel(model: string) {
    // Update the selected model name
    this.store.dispatch(setAiModelName({ aiModelName: model }));
    // Update the communicator
    this.setModelCommunicator();
  }

  // Selects right concrete builder according to the selected model
  setModelCommunicator() {
    this.selectedModelName$.subscribe((selectedModelName) => {
      switch (selectedModelName) {
        case (conversationalModelsName.BLENDER_BOT): {
          this.aiModelCommunicatorCreator = this.blenderbotCommunicator;
          break;
        }
        case (conversationalModelsName.BLENDER_BOT_3B): {
          this.aiModelCommunicatorCreator = this.blenderbot3BCommunicator;
          break;
        }
        case conversationalModelsName.DIALOGPT: {
          this.aiModelCommunicatorCreator = this.dialogptCommunicator;
          break;
        }
      }
    })
  }

  // Creates user message object
  createUserMessage(message: string): TextMessage {
    return {
      type: "text",
      isAnswer: false,
      text: message
    };
  }

  // Adds a user message to the list of message displayed in the template
  addUserMessageToList(message: TextMessage) {
    this.store.dispatch(addUserQuestion({ textMessage: message }))
  }
}
