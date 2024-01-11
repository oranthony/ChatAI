import { Component } from '@angular/core';
import { AiModelCommunicatorCreator, ConcreteOpenjourneyCommunicatorCreator, ConcreteStableDiffusion1_5CommunicatorCreator, ConcreteStableDiffusionXLCommunicatorCreator } from 'src/app/common/factories/aimodel-communicator-factory';
import { ErrorMessageState, LoadingMessageState, MessageState, SuccessMessageState } from 'src/app/common/models/message-state';
import { PictureMessage } from 'src/app/common/models/picture-message';
import { TextMessage } from 'src/app/common/models/text-message';
import { PictureMessageService } from 'src/app/common/services/picture-message.service';
import { containersName, pictureMessageSugestions, textToImageModelsName } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import { addUserQuestion, askAnswerAI, setAiModelName } from 'src/app/state/picture-gen/picture-gen.actions';
import { Observable } from 'rxjs/internal/Observable';
import { selectAiModelName, selectMessageState, selectMessageList } from 'src/app/state/picture-gen/picture-gen-reducer';
import { SuggestionsService } from 'src/app/common/services/suggestions.service';



@Component({
  selector: 'app-picture-gen-container',
  templateUrl: './picture-gen-container.component.html',
  styleUrls: ['./picture-gen-container.component.scss']
})
export class PictureGenContainerComponent {
  // Title displayed in the top bar
  title: string = "Image Generator";
  // Name of this container passed down to message-suggestion component. Used to treack down the source of the suggestions.
  containerName = containersName.PICTUREGEN;

  // List of messages send by user (TextMessage) and AI pictures answers (PictureMessage)
  messageList$: Observable<(TextMessage | PictureMessage)[]>;

  // Contains request state (success, loading or failed)
  messageState$: Observable<MessageState>;

  // Contains the names of the available models
  modelList: string[] = [];
  
  // Name of the selected model used to generate answers
  selectedModelName$: Observable<string>;

  // Instantiate all concrete items from factory
  private aiModelCommunicatorCreator!: AiModelCommunicatorCreator;
  private readonly openjourneyCommunicator = new ConcreteOpenjourneyCommunicatorCreator();
  private readonly stableDiffusion1_5Communicator = new ConcreteStableDiffusion1_5CommunicatorCreator();
  private readonly stableDiffusionXLCommunicator = new ConcreteStableDiffusionXLCommunicatorCreator();

  // Holds the suggestions of messages displayed in message-list component
  messageSuggestionsList: string[];

  constructor(private pictureMessageService: PictureMessageService, private suggestionService: SuggestionsService, private store: Store) {
    // Assign all observable
    this.messageState$ = this.store.pipe(select(selectMessageState));
    this.messageList$ = this.store.pipe(select(selectMessageList));
    this.selectedModelName$ = this.store.pipe(select(selectAiModelName));
    this.setModelCommunicator();

    // Fill modelList with the names of the models stored in environment variable
    Object.entries(textToImageModelsName).forEach(([key, value]) => {
      this.modelList?.push(value);
    });

    // Fill array of suggestions of messages based on data retreived from local JSON
    this.messageSuggestionsList = pictureMessageSugestions;

    // React when user click on suggested message
    this.suggestionService.notificationForPictureContainerReceived.subscribe(
      suggestion => {
        // When click on suggested message, the corresponding message is send
        this.onSendMessage(suggestion);
      }
    )
  }

  // When user sends a message
  onSendMessage(message: string) {
    // Create TextMessage Object with user message
    let userMessage = this.createUserMessage(message);

    // Add user message to the list of messages
    this.addMessageToList(userMessage);

    // Set the API URL for the model
    this.pictureMessageService.setReourceUrl(this.aiModelCommunicatorCreator.getAPIUrl());

    // Dispatch action to ask answer to AI via dedicated effect
    this.store.dispatch(askAnswerAI({ message: message }));
  }

  // When user selects a model the selected model is updated and the conresponding concrete builder is asign as global variable
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
        case textToImageModelsName.OPENJOURNEY: {
          this.aiModelCommunicatorCreator = this.openjourneyCommunicator;
          break;
        }
        case textToImageModelsName.STABLE_DIFFUSION_1_5: {
          this.aiModelCommunicatorCreator = this.stableDiffusion1_5Communicator;
          break;
        }
        case textToImageModelsName.STABLE_DIFFUSION_XL: {
          this.aiModelCommunicatorCreator = this.stableDiffusionXLCommunicator;
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

  // Adds user message to the list of message displayed in the template
  addMessageToList(message: TextMessage) {
    this.store.dispatch(addUserQuestion({textMessage: message}))
  }


  castMessageAsPictureMessage(message: any): PictureMessage {
    return message;
  }
}
