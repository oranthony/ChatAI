import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AiModelCommunicatorCreator, ConcreteBlenderbotCommunicatorCreator, ConcreteDialogptCommunicatorCreator, ConcreteFalconCommunicatorCreator, ConcreteLlamaCommunicatorCreator } from 'src/app/common/factories/aimodel-communicator-factory';
import { ErrorMessageState, LoadingMessageState, MessageState, SuccessMessageState } from 'src/app/common/models/message-state';
import { TextMessage } from 'src/app/common/models/text-message';
import { TextMessageService } from 'src/app/common/services/text-message.service';
import { environment } from 'src/environments/environment';
import { modelsName } from 'src/environments/environment.development';

const exampleTextMessage: TextMessage[] = [{ isAnswer: false, text: "dfsdfgdfgdfg" }, { isAnswer: true, text: "hgnjjhghjkhjkjhkg" }, { isAnswer: false, text: "dfsdfgdfgdfg" }, { isAnswer: true, text: "hgnjjhghjkhjkjhkg" }, { isAnswer: false, text: "dfsdfgdfgdfg" }, { isAnswer: true, text: "hgnjjhghjkhjkjhkg" }, { isAnswer: false, text: "dfsdfgdfgdfg" }, { isAnswer: true, text: "hgnjjhghjkhjkjhkg" }, { isAnswer: false, text: "dfsdfgdfgdfg" }, { isAnswer: true, text: "hgnjjhghjkhjkjhkg" }]

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

  aiModelCommunicatorCreator!: AiModelCommunicatorCreator;

  constructor(private textMessageService: TextMessageService) {
    // Initialize message status with success value
    this.messageState = ChatbotContainerComponent.successMessageState;

    // Fill modelList with the names stored in environment variable
    Object.entries(modelsName).forEach(([key, value]) => {
      this.modelList?.push(value);
    });

    // Set a model as default (no logic in this case, just the first model available)
    if (this.modelList) {
      this.selectedModel = this.modelList[0];
    }
  }

  // When user sends a message
  onSendMessage(message: string) {
    // Set loading state
    this.messageState = ChatbotContainerComponent.loadingMessageState;

    // Create user message
    let userMessage: TextMessage = {
      isAnswer: false,
      text: message
    };

    // Add user message to the list of messages
    this.messageList.push(userMessage);
    this.messageList = [...this.messageList];


    // Select right concrete builder

    switch (this.selectedModel) {
      case (modelsName.BLENDER_BOT): {
        let blenderbotCommunicator = new ConcreteBlenderbotCommunicatorCreator();
        this.aiModelCommunicatorCreator = blenderbotCommunicator;
        break;
      }
      case (modelsName.BLENDER_BOT_3B): {
        let blenderbotCommunicator = new ConcreteBlenderbotCommunicatorCreator();
        this.aiModelCommunicatorCreator = blenderbotCommunicator;
        break;
      }
      case modelsName.DIALOGPT: {
        let dialogptCommunicator = new ConcreteDialogptCommunicatorCreator();
        this.aiModelCommunicatorCreator = dialogptCommunicator;
        break;
      }
    }

    this.textMessageService.setReourceUrl(this.aiModelCommunicatorCreator.getAPIUrl());

    // Call API to get an answer
    //TODO: call concrete builder instead
    this.textMessageService.post(this.aiModelCommunicatorCreator.parseArguments(message)).subscribe(
      res => {
        // Add API answer to the list of messages
        this.messageList.push(res);
        this.messageList = [...this.messageList];
        this.messageState = ChatbotContainerComponent.successMessageState;
      },
      err => {
        let errorMessageState: ErrorMessageState = { state: "Error", error: { message: err } };
        this.messageState = errorMessageState;
      }
    );
  }

  // When user selects a model
  onChoosenModel(model: string) {
    this.selectedModel = model;
  }

}
