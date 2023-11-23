import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AiModelCommunicatorCreator, ConcreteOpenjourneyCommunicatorCreator, ConcreteStableDiffusion1_5CommunicatorCreator, ConcreteStableDiffusionXLCommunicatorCreator } from 'src/app/common/factories/aimodel-communicator-factory';
import { ErrorMessageState, LoadingMessageState, MessageState, SuccessMessageState } from 'src/app/common/models/message-state';
import { PictureMessage } from 'src/app/common/models/picture-message';
import { TextMessage } from 'src/app/common/models/text-message';
import { PictureMessageService } from 'src/app/common/services/picture-message.service';
import { textToImageModelsName } from 'src/environments/environment';

@Component({
  selector: 'app-picture-gen-container',
  templateUrl: './picture-gen-container.component.html',
  styleUrls: ['./picture-gen-container.component.scss']
})
export class PictureGenContainerComponent {
  title: string = "Image Builder with AI"

  // List of messages send by user (TextMessage) and AI pictures answers (PictureMessage)
  messageList: (TextMessage | PictureMessage)[] = [];

  // Contains request state (success, loading or failed)
  messageState!: MessageState;
  private static successMessageState: SuccessMessageState = { state: "Success" };
  private static loadingMessageState: LoadingMessageState = { state: "Loading" };

  // Contains the names of the available models
  modelList: string[] = [];
  // Name of the selected model used to generate answers
  selectedModel: string = ""

  private aiModelCommunicatorCreator!: AiModelCommunicatorCreator;
  private readonly openjourneyCommunicator = new ConcreteOpenjourneyCommunicatorCreator();
  private readonly stableDiffusion1_5Communicator = new ConcreteStableDiffusion1_5CommunicatorCreator();
  private readonly stableDiffusionXLCommunicator = new ConcreteStableDiffusionXLCommunicatorCreator();

  constructor(private sanitizer: DomSanitizer, private pictureMessageService: PictureMessageService) {
    // Initialize message status with success value
    this.messageState = PictureGenContainerComponent.successMessageState;

    // Fill modelList with the names of the models stored in environment variable
    Object.entries(textToImageModelsName).forEach(([key, value]) => {
      this.modelList?.push(value);
    });

    // Set a model as default (no logic in this case, just the first model available)
    if (this.modelList) {
      // Set the first model as default
      this.selectedModel = this.modelList[0];
      // Set the corresponding communicator
      this.setModelCommunicator();
    }
  }

  onSendMessage(message: string) {
    // Set loading state
    this.messageState = PictureGenContainerComponent.loadingMessageState;

    // Create TextMessage Object with user message
    let userMessage = this.createUserMessage(message);

    // Add user message to the list of messages
    this.addMessageToList(userMessage);

    // Set the API URL for the model
    this.pictureMessageService.setReourceUrl(this.aiModelCommunicatorCreator.getAPIUrl());

    // Call API to get an answer
    this.pictureMessageService.post(this.aiModelCommunicatorCreator.parseArguments(message)).subscribe(
      res => {
        this.addMessageToList(res);
        this.messageState = PictureGenContainerComponent.successMessageState;
      },
      err => {
        let errorMessageState: ErrorMessageState = { state: "Error", error: { message: err } };
        this.messageState = errorMessageState;
      }
    )
  }

  // When user selects a model the selected model is updated and the conresponding concrete builder is asign as global variable
  onChoosenModel(model: string) {
    // Update the model name
    this.selectedModel = model;
    // Update the communicator
    this.setModelCommunicator();
  }

  // Selects right concrete builder according to the selected model
  setModelCommunicator() {
    switch (this.selectedModel) {
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
  }

  // Creates user message object
  createUserMessage(message: string): TextMessage {
    return {
      type: "text",
      isAnswer: false,
      text: message
    };
  }

  // Adds a given message to the list of message displayed in the template
  addMessageToList(message: TextMessage | PictureMessage) {
    this.messageList.push(message);
    this.messageList = [...this.messageList];
  }


  castMessageAsPictureMessage(message: any): PictureMessage {
    return message;
  }
}
