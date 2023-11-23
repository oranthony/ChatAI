import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AiModelCommunicatorCreator, ConcreteBlenderbot3BCommunicatorCreator, ConcreteBlenderbotCommunicatorCreator, ConcreteDialogptCommunicatorCreator, ConcreteFalconCommunicatorCreator, ConcreteLlamaCommunicatorCreator } from 'src/app/common/factories/aimodel-communicator-factory';
import { ErrorMessageState, LoadingMessageState, MessageState, SuccessMessageState } from 'src/app/common/models/message-state';
import { TextMessage } from 'src/app/common/models/text-message';
import { TextMessageService } from 'src/app/common/services/text-message.service';
import { environment } from 'src/environments/environment';
import { conversationalModelsName } from 'src/environments/environment.development';

@Component({
  selector: 'app-chatbot-container',
  templateUrl: './chatbot-container.component.html',
  styleUrls: ['./chatbot-container.component.scss']
})
export class ChatbotContainerComponent {
  //message$!: Observable<TextMessage[]>;

  title: string = "Chatbot  AI";

  // Contains all messages, user questions and AI answers
  messageList: TextMessage[] = [];

  // Contains request state (success, loading or failed)
  messageState!: MessageState;
  private static successMessageState: SuccessMessageState = { state: "Success" };
  private static loadingMessageState: LoadingMessageState = { state: "Loading" };

  // Contains the names of the available models
  modelList: string[] = [];
  // Name of the selected model used to generate answers
  selectedModel: string = ""

  private aiModelCommunicatorCreator!: AiModelCommunicatorCreator;
  private readonly blenderbotCommunicator = new ConcreteBlenderbotCommunicatorCreator();
  private readonly blenderbot3BCommunicator = new ConcreteBlenderbot3BCommunicatorCreator();
  private readonly dialogptCommunicator = new ConcreteDialogptCommunicatorCreator();

  constructor(private textMessageService: TextMessageService) {
    // Initialize message status with success value
    this.messageState = ChatbotContainerComponent.successMessageState;

    // Fill modelList with the names of the models stored in environment variable
    Object.entries(conversationalModelsName).forEach(([key, value]) => {
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

  // When user sends a message
  onSendMessage(message: string) {
    // Set loading state
    this.messageState = ChatbotContainerComponent.loadingMessageState;

    // Create TextMessage Object with user message
    let userMessage = this.createUserMessage(message);

    // Add user message to the list of messages
    this.addMessageToList(userMessage);

    // Set the API URL for the model
    this.textMessageService.setReourceUrl(this.aiModelCommunicatorCreator.getAPIUrl());

    // Call API to get an answer
    this.textMessageService.post(this.aiModelCommunicatorCreator.parseArguments(message)).subscribe(
      res => {
        // Add API answer to the list of messages
        this.addMessageToList(res);
        this.messageState = ChatbotContainerComponent.successMessageState;
      },
      err => {
        let errorMessageState: ErrorMessageState = { state: "Error", error: { message: err } };
        this.messageState = errorMessageState;
      }
    );
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
  addMessageToList(message: TextMessage) {
    this.messageList.push(message);
    this.messageList = [...this.messageList];
  }

}
